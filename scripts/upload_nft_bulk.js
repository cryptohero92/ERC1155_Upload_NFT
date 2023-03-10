const fs = require('fs');
const Moralis = require('moralis').default;
require('dotenv').config();

let abi = [];
let promises = [];

for (let i = 1; i <= 5; i++) {
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + i.toString(16)).substring(-64);

    promises.push(new Promise((res, rej) => {
        fs.readFile(`./images/dog${i}.jpg`, (err, data) => {
            if (err || data == undefined) {
                rej();
                return;
            }
            abi.push({
                path: `images/${paddedHex}.jpg`,
                content: data.toString("base64")
            });
            res();
        })
    }));    
}

Promise.all(promises).then(async () => {
    console.log(abi.length);
    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY
    });
    let response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi
    });
    // console.log(response?.toJSON());

    // now create metadata per ipfs image and upload it again.
    const images_json = response?.toJSON();
    abi = [];
    images_json.forEach((image_info, index) => {
        abi.push({
            path: `metadata/${index}.json`,
            content: {
                image: image_info.path,
                name: `Dog NFT #${index}`,
                description: `My Test NFT #${index} using for ERC1155`
            }
        })
    });
    response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi
    });
    console.log(response?.toJSON());
})