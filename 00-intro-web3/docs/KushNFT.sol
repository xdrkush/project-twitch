// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KushNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private totalSupplyNFT; // total NFTs
    Counters.Counter private totalSupplyCollection; // total Collections

    struct NFTInfo {
        uint256 id;
        string title;
        // Add any other information that you need for your NFTs
    }

    struct CollectionInfo {
        uint256 id;
        string title;
        address author;
        uint256 totalSupply;
    }

    struct NFTInfoCollection {
        uint256 id;
        string title;
        address author;
        uint256 totalSupply;
        mapping(uint256 => uint256) tokenURIs;
        mapping(uint256 => uint256) tokenIndexs;
    }

    mapping(uint256 => NFTInfo) public NFTInfos;
    mapping(uint256 => NFTInfoCollection) public NFTInfosCollections;

    constructor( string memory name, string memory symbol ) ERC721(name, symbol) {}

    function createCollection(string memory _title) public {
        uint256 id = totalSupplyCollection.current();
        totalSupplyCollection.increment();

        NFTInfosCollections[id].id = id;
        NFTInfosCollections[id].title = _title;
        NFTInfosCollections[id].author = msg.sender;
    }

    function getTotalSupplyNFT() public view returns (uint256) {
        return totalSupplyNFT._value;
    }

    function getTotalSupplyCollection() public view returns (uint256) {
        return totalSupplyCollection._value;
    }

    function getCollectionInfo( uint256 id) public view returns (uint256, string memory, address, uint256) {
        CollectionInfo memory col = CollectionInfo({
            id: NFTInfosCollections[id].id,
            title: NFTInfosCollections[id].title,
            author: NFTInfosCollections[id].author,
            totalSupply: NFTInfosCollections[id].totalSupply
        });

        return (col.id, col.title, col.author, col.totalSupply);
    }

    function getCollectionIndexs( uint256 _collection_id, uint256 _index) public view returns (uint256) {
        return NFTInfosCollections[_collection_id].tokenIndexs[_index];
    }

    function getNFT(uint256 _id) public view returns (NFTInfo memory) {
        return NFTInfos[_id];
    }

    function mint(address _to,uint256 _collection_id,string memory _title) public returns (uint256) {
        if (NFTInfosCollections[_collection_id].id != _collection_id) {
            revert("_collection_id is invalid !");
        }
        uint256 id = totalSupplyNFT.current();
        totalSupplyNFT.increment();

        require(
            NFTInfosCollections[_collection_id].totalSupply + 1 <=
                type(uint256).max,
            "MyNFTContract: total supply overflow"
        );

        NFTInfos[id] = NFTInfo(id, _title);

        uint256 newID = NFTInfosCollections[_collection_id].totalSupply + 1;

        NFTInfosCollections[_collection_id].totalSupply += 1;
        NFTInfosCollections[_collection_id].tokenIndexs[newID] = id;
        NFTInfosCollections[_collection_id].tokenURIs[id] = id;

        _mint(_to, id);

        return id;
    }
}
