// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KushNFT is ERC721, Ownable {
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
        string uriIMG;
        address addr;
        bool isValid;
        uint256 totalNFTs;
        mapping(uint256 => bool) collections; // [ uint256: bool,  ]
        mapping(uint256 => bool) nfts; // [ uint256: bool,  ]
        mapping(uint256 => bool) certifs; // [ uint256: bool,  ]
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
        mapping(address => mapping(uint256 => bool)) consumers;
    }

    mapping(uint256 => NFTCour) public NFTCours;
    mapping(uint256 => NFTCertif) public NFTCertifs;
    mapping(uint256 => NFTCollection) public NFTCollections;
    uint256[] nftCollectionsARR;
    mapping(address => NFTUser) public NFTUsers;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    // Authorization User
    function isAuthorizedAccessUser() public view returns (bool) {
        return NFTUsers[msg.sender].isValid;
    }

    modifier userAccess() {
        require(NFTUsers[msg.sender].isValid, "Vous n etes pas inscrit");
        _;
    }

    // Authorization Collection
    function isAuthorizedAccessCollection(
        uint256 _id
    ) public view returns (bool) {
        return NFTUsers[msg.sender].collections[_id];
    }

    // Authorization NFT
    function isAuthorizedAccessNFT(uint256 _id) public view returns (bool) {
        return NFTUsers[msg.sender].nfts[_id];
    }

    // Total Supply (public)
    function getTotalSupplyNFTs() public view returns (uint256) {
        return totalSupplyNFTs._value;
    }

    function getTotalSupplyCollections() public view returns (uint256) {
        return totalSupplyCollections._value;
    }

    function getTotalCertifs() public view returns (uint256) {
        return totalSupplyCertifs._value;
    }

    function getTotalConsumers() public view returns (uint256) {
        return totalConsumers._value;
    }

    // Register NFT (id) to User (address) (public)
    function registerConsumer() public {
        require(isAuthorizedAccessUser() != true, "tu es deja enregistrer, ;)");

        uint256 id = totalConsumers.current();
        totalConsumers.increment();

        NFTUsers[msg.sender].id = id;
        NFTUsers[msg.sender].addr = msg.sender;
        NFTUsers[msg.sender].isValid = true;
    }

    // Register NFT (id) to a User (address)
    function registerConsumerToCollection(
        uint256 _collection_id
    ) public userAccess {
        require(
            isAuthorizedAccessCollection(_collection_id) != true,
            "Vous etes deja inscrit a la collection"
        );

        // On l'ajoute dans la collection
        NFTCollections[_collection_id].consumers[msg.sender][
            _collection_id
        ] = true;
        NFTCollections[_collection_id].totalConsumers += 1;

        // Feature
        NFTUsers[msg.sender].collections[_collection_id] = true;

        // Et on met le consumer msg.sender dans le premier nft
        // registerConsumerToNFT(nftCollectionsARR[0]);
    }

    // Register NFT (id) to User (address) (public)
    function registerConsumerToNFT(uint256 _nft_id) public userAccess {
        require(
            isAuthorizedAccessNFT(_nft_id) != true,
            "Vous etes deja inscrit a se nft"
        );

        NFTUsers[msg.sender].nfts[_nft_id] = true;
    }

    // Get Infos Collection By ID (public)
    function getUserInfo(
        address _addr
    )
        public
        view
        userAccess
        returns (uint256, string memory, string memory, address, bool, uint256)
    {
        // require(
        //     NFTUsers[msg.sender].addr == msg.sender,
        //     "You are not registred."
        // );

        // Info
        uint256 id = NFTUsers[_addr].id;
        string memory username = NFTUsers[_addr].username;
        string memory img = NFTUsers[_addr].uriIMG;
        address addr = NFTUsers[_addr].addr;
        bool valid = NFTUsers[_addr].isValid;
        uint256 total = NFTUsers[_addr].totalNFTs;

        return (id, username, img, addr, valid, total);
    }

    // Manage Collection (public)
    function createCollection(
        string memory _title,
        string memory _uriIMG
    ) public onlyOwner {
        uint256 id = totalSupplyCollections.current();
        totalSupplyCollections.increment();

        NFTCollections[id].id = id;
        NFTCollections[id].title = _title;
        NFTCollections[id].uriIMG = _uriIMG;
        NFTCollections[id].author = msg.sender;

        nftCollectionsARR.push(id);

        // Access collection
        NFTUsers[msg.sender].collections[id] = true;
    }

    // Get * collections ids (public)
    function getCollectionsIDs()
        public
        view
        userAccess
        returns (uint256[] memory)
    {
        // uint256[] memory values = new uint256[](
        //     totalSupplyCollections.current()
        // );

        // for (uint256 i = 0; i < totalSupplyCollections.current(); i++) {
        //     uint256 id = NFTCollections[i].id;
        //     values[i] = id;
        // }

        return (nftCollectionsARR);
    }

    // Get Infos Collection By ID (public)
    function getCollectionInfo(
        uint256 _id
    )
        public
        view
        userAccess
        returns (
            uint256,
            string memory,
            address,
            string memory,
            uint256,
            uint256
        )
    {
        // Info
        string memory title = NFTCollections[_id].title;
        address author = NFTCollections[_id].author;
        string memory uriIMG = NFTCollections[_id].uriIMG;
        uint256 TSupply = NFTCollections[_id].totalSupply;
        uint256 TConsumers = NFTCollections[_id].totalConsumers;

        return (_id, title, author, uriIMG, TSupply, TConsumers);
    }

    // Get NFTs ids in Collections (owner or customer)
    function getCollectionIndexs(
        uint256 _collection_id
    ) public view userAccess returns (uint256[] memory) {
        require(
            isAuthorizedAccessCollection(_collection_id) == true,
            "Vous etes pas inscrit pour ce nft::collection"
        );

        NFTCollection storage collection = NFTCollections[_collection_id];
        uint256[] memory values = new uint256[](collection.totalSupply);

        for (uint256 i = 0; i < collection.totalSupply; i++) {
            if (NFTUsers[msg.sender].nfts[i] == true) {
                uint256 id = collection.tokenIndexs[i];
                values[i] = id;
            }
        }

        return (values);
    }

    // Get NFTs ids in Collections (owner or customer)
    function getIdNFTInCollectionByIndex(
        uint256 _collection_id,
        uint256 index
    ) public view userAccess returns (uint256) {
        require(
            isAuthorizedAccessCollection(_collection_id) == true,
            "Vous etes pas inscrit pour ce nft::collection"
        );
        uint256 idNFT = NFTCollections[_collection_id].tokenIndexs[index];

        require(
            isAuthorizedAccessNFT(idNFT) == true,
            "Vous etes pas inscrit pour ce nft::cour"
        );

        return idNFT;
    }

    // Get NFT Infos (owner or customer)
    function getNFT(
        uint256 _id
    )
        public
        view
        userAccess
        returns (uint256, string memory, string memory, address)
    {
        require(
            isAuthorizedAccessNFT(_id) == true,
            "Vous etes pas inscrit pour ce nft::cour"
        );

        return (
            NFTCours[_id].id,
            NFTCours[_id].title,
            NFTCours[_id].uriIMG,
            NFTCours[_id].author
        );
    }

    // Mint (public)
    function mint(
        uint256 _collection_id,
        string memory _title,
        string memory _uriIMG
    ) public onlyOwner returns (uint256) {
        require(
            NFTCollections[_collection_id].id == _collection_id,
            "_collection_id is invalid !"
        );

        uint256 tokenid = totalSupplyNFTs.current();
        totalSupplyNFTs.increment();

        NFTCours[tokenid] = NFTCour({
            id: tokenid,
            title: _title,
            uriIMG: _uriIMG,
            author: msg.sender,
            price: 0
        });

        uint256 index = NFTCollections[_collection_id].totalSupply;

        NFTCollections[_collection_id].totalSupply += 1;
        NFTCollections[_collection_id].tokenIndexs[index] = tokenid;

        _safeMint(msg.sender, tokenid);

        // Access to NFT
        NFTUsers[msg.sender].nfts[tokenid] = true;

        return tokenid;
    }
}
