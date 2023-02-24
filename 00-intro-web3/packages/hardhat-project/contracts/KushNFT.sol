// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KushNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private totalSupplyNFTs; // total NFTs
    Counters.Counter private totalSupplyCertifs; // total Certifs
    Counters.Counter private totalSupplyCollections; // total Collections
    Counters.Counter private totalConsumers; // total Consumers

    // NFT (Cours)
    struct NFTCour {
        uint256 id;
        string title;
        string uriIMG;
        address author;
        uint256 price;
    }

    // NFT (Cours)
    struct NFTCertif {
        uint256 id;
        string title;
        string uriIMG;
        address author;
    }

    // NFT (User)
    struct NFTUser {
        uint256 id;
        string username;
        string img;
        address addr;
        uint256 totalNFTs;
        mapping(uint256 => bool) nfts; // [ address: bool,  ]
        mapping(uint256 => bool) certifs; // [ address: bool,  ]
    }

    // NFT (Collection)
    struct NFTCollection {
        uint256 id;
        string title;
        address author;
        string uriIMG;
        uint256 totalSupply;
        uint256 totalConsumers;
        mapping(uint256 => uint256) tokenIndexs; 
        mapping(address => mapping(bool => uint256)) consumers;
    }

    mapping(uint256 => NFTCour) public NFTCours;
    mapping(uint256 => NFTCertif) public NFTCertifs;
    mapping(uint256 => NFTCollection) public NFTCollections;
    mapping(address => NFTUser) public NFTUsers;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    // Total Supply
    function getTotalSupplyNFTs() public view returns (uint256) {
        return totalSupplyNFTs._value;
    }
    function getTotalSupplyCollections() public view returns (uint256) {
        return totalSupplyCollections._value;
    }
    function getTotalConsumers() public view returns (uint256) {
        return totalConsumers._value;
    }
    function getTotalCertifs() public view returns (uint256) {
        return totalConsumers._value;
    }

    // Manage Collection
    function createCollection(
        string memory _title,
        string memory _uriIMG
    ) public {
        uint256 id = totalSupplyCollection.current();
        totalSupplyCollection.increment();

        NFTInfosCollections[id].id = id;
        NFTInfosCollections[id].title = _title;
        NFTInfosCollections[id].uriIMG = _uriIMG;
        NFTInfosCollections[id].author = msg.sender;
    }

    function getCollectionsIDs() public view returns (uint256[] memory) {
        uint256[] memory values = new uint256[](
            totalSupplyCollection.current()
        );

        for (uint256 i = 0; i < totalSupplyCollection.current(); i++) {
            uint256 id = NFTInfosCollections[i].id;
            values[i] = id;
        }
        return (values);
    }

    function getCollectionInfo(
        uint256 id
    )
        public
        view
        returns (
            uint256,
            string memory,
            address,
            string memory,
            uint256,
            uint256[] memory
        )
    {
        // Info
        uint256 collection_id = NFTInfosCollections[id].id;
        string memory title = NFTInfosCollections[id].title;
        address author = NFTInfosCollections[id].author;
        string memory uriIMG = NFTInfosCollections[id].uriIMG;
        uint256 totalSupply = NFTInfosCollections[id].totalSupply;

        // make array for ids nft in collection
        uint256[] memory values = new uint256[](totalSupply);
        for (uint256 i = 0; i < totalSupply; i++) {
            uint256 nft_id = NFTInfosCollections[collection_id].tokenIndexs[i];
            values[i] = nft_id;
        }

        return (id, title, author, uriIMG, totalSupply, values);
    }

    function getCollectionIndexs(
        uint256 _collection_id
    ) public view returns (uint256[] memory) {
        NFTInfoCollection storage collection = NFTInfosCollections[
            _collection_id
        ];
        uint256[] memory values = new uint256[](collection.totalSupply);

        for (uint256 i = 0; i < collection.totalSupply; i++) {
            uint256 id = collection.tokenIndexs[i];
            values[i] = id;
        }
        return (values);
    }

    // function getCollectionConsumers(
    //     uint256 _collection_id
    // ) public view returns (address[] memory) {
    //     NFTInfoCollection storage collection = NFTInfosCollections[
    //         _collection_id
    //     ];
    //     address[] memory values = new address[](collection.totalConsumers);

    //     for (uint256 i = 0; i < collection.totalConsumers; i++) {
    //         address addr = collection.consumers[i];
    //         values[i] = addr;
    //     }

    //     return (values);
    // }

    // function registerConsumerToCollection(
    //     uint256 _collection_id
    // ) public {
    //     // NFTInfoCollection storage collection = NFTInfosCollections[
    //     //     _collection_id
    //     // ];
    //     // uint256 nft_id =  collection.tokenIndexs[0];

    //     // On l'ajoute dans la collection
    //     uint256 idConsumer = NFTInfosCollections[_collection_id].totalConsumers;
    //     uint256 countNFT = 0;
    //     NFTInfosCollections[_collection_id].consumers[msg.sender] = NFTInfosCollections[_collection_id].tokenIndexs[countNFT];
    //     NFTInfosCollections[_collection_id].totalConsumers += 1;

    //     // Et on met le consumer msg.sender dans le premier nft de la list tokenIndexs
    //     // registerConsumerToNFT(nft_id);
    //     // return nft_id;
    // }

    // Manage NFT
    // function getNFT(
    //     uint256 _id
    // )
    //     public
    //     view
    //     returns (uint256, string memory, string memory, address, address[] memory, bool[] memory)
    // {
    //     // require(
    //     //     NFTInfos[_id].consumers[msg.sender] == msg.sender,
    //     //     "Vous etes pas inscrit pour ce nft"
    //     // );

    //     NFTInfo storage nft = NFTInfos[_id];

    //     address[] memory keys = new address[](nft.totalConsumers);
    //     bool[] memory values = new bool[](nft.totalConsumers);

    //     for (uint256 i = 0; i < nft.totalConsumers; i++) {
    //         bool addr = nft.consumers[msg.sender];
    //         address addr1 = nft.consumers[msg.sender];
    //         keys[i] = addr1;
    //         values[i] = addr;
    //     }

    //     return (
    //         NFTInfos[_id].id,
    //         NFTInfos[_id].title,
    //         NFTInfos[_id].uriIMG,
    //         NFTInfos[_id].author,
    //         keys,
    //         values
    //     );
    // }

    // function registerConsumerToNFT(uint256 _nft_id) public {
    //     NFTInfos[_nft_id].consumers[msg.sender] = true;
    // }

    // Mint
    function mint(
        address _to,
        uint256 _collection_id,
        string memory _title,
        string memory _uriIMG
    ) public returns (uint256) {
        if (NFTInfosCollections[_collection_id].id != _collection_id) {
            revert("_collection_id is invalid !");
        }
        uint256 tokenid = totalSupplyNFT.current();
        totalSupplyNFT.increment();

        require(
            NFTInfosCollections[_collection_id].totalSupply + 1 <=
                type(uint256).max,
            "MyNFTContract: total supply overflow"
        );

        NFTInfos[tokenid].id = tokenid;
        NFTInfos[tokenid].title = _title;
        NFTInfos[tokenid].uriIMG = _uriIMG;
        NFTInfos[tokenid].author = msg.sender;

        uint256 index = NFTInfosCollections[_collection_id].totalSupply;

        NFTInfosCollections[_collection_id].totalSupply += 1;
        NFTInfosCollections[_collection_id].tokenIndexs[index] = tokenid;

        _mint(_to, tokenid);

        return tokenid;
    }
}
