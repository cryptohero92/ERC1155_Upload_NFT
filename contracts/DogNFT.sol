// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract DogNFT is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant CROWN = 4;

    constructor() ERC1155("https://ipfs.moralis.io:2053/ipfs/QmcdyqSGuV9rgAui8XPgHEWGMyJgRDTSRdBj18x4ZQ2tuU/metadata/{id}.json") {
        _mint(msg.sender, GOLD, 1, "");
        _mint(msg.sender, SILVER, 1, "");
        _mint(msg.sender, SWORD, 1, "");
        _mint(msg.sender, SHIELD, 1, "");
        _mint(msg.sender, CROWN, 1, "");
    }
}