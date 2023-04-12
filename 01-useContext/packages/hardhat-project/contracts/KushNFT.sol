// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./KushToken.sol";

contract KushNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    KushToken public kushToken;
    address public addressToken;

    // ------------------------------------------------------------
    // User
    struct User {
        uint256 id;
        string username;
        string uriIMG;
        address addr;
        bool isValid;
        uint256 totalCertifs;
    }

    Counters.Counter private totalConsumers;
    mapping(address => User) public users;

    // ------------------------------------------------------------
    // Cour
    struct Cour {
        uint256 id;
        string title;
        string uriIMG;
        address author;
        uint256 collection_id;
        uint256 position;
    }

    Counters.Counter private totalCours;
    mapping(uint256 => Cour) public cours;

    // ------------------------------------------------------------
    // Collection
    struct Collection {
        uint256 id;
        string title;
        address author;
        string uriIMG;
        uint256 price;
        uint256 totalSupply;
        uint256 totalConsumers;
    }

    Counters.Counter private totalCollections;
    mapping(uint256 => Collection) public collections;

    // ------------------------------------------------------------
    // Certif
    struct Certif {
        uint256 id;
        string title;
        string uriIMG;
        address author;
    }

    Counters.Counter private totalCertifs;
    mapping(uint256 => Certif) public Certifs;

    // ------------------------------------------------------------
    // Mapping

    // address(user) => id(collection) => bool
    mapping(address => mapping(uint256 => bool))
        public userRegistredOnCollection;
    // address(user) => id(nft) => bool
    mapping(address => mapping(uint256 => bool)) public userRegistredOnCour;

    // ------------------------------------------------------------
    // Event

    event Register (address indexed userAddr);

    // ------------------------------------------------------------

    constructor(
        string memory _name,
        string memory _symbol,
        address _addressERC20
    ) ERC721(_name, _symbol) {
        kushToken = KushToken(_addressERC20);
        addressToken = _addressERC20;
    }

    // ------------------------------------------------------------
    // Access

    modifier userAccess() {
        userIsRegistred();
        _;
    }

    modifier userAccessOnCollection(uint256 _collection_id) {
        userIsRegistredOnCollection(_collection_id);
        _;
    }

    // ------------------------------------------------------------
    // Authorization | Registred

    function userIsRegistred() public view {
        require(users[msg.sender].isValid == true, "Vous n etes pas inscrit");
    }

    function userIsRegistredOnCollection(uint256 _collection_id) public view {
        require(userRegistredOnCollection[msg.sender][_collection_id] == true, "Vous n etes pas inscrit pour ce cour");
    }

    // function userIsRegistredToCollection(
    //     uint256 _id
    // ) public view returns (bool) {
    //     require(
    //         userRegistredOnCollection[msg.sender][_id] == true,
    //         "Vous n etes pas inscrit sur cette collection"
    //     );
    //     return true;
    // }

    // function userIsRegistredToCour(uint256 _id) public view returns (bool) {
    //     require(
    //         userRegistredOnCour[msg.sender][_id] == true,
    //         "Vous n etes pas inscrit sur ce cour"
    //     );
    //     return true;
    // }

    // ------------------------------------------------------------
    // Get Total

    function getAddressToken() public view returns (address) {
        return addressToken;
    }

    function getTotalUsers() public view returns (uint256) {
        return totalConsumers._value;
    }

    function getTotalCours() public view returns (uint256) {
        return totalCours._value;
    }

    function getTotalCollections() public view returns (uint256) {
        return totalCollections._value;
    }

    function getTotalCertifs() public view returns (uint256) {
        return totalCertifs._value;
    }

    // ------------------------------------------------------------
    // Register

    function registerConsumer() public {
        require(users[msg.sender].isValid == false, "tu es deja inscrit ;)");

        uint256 id = totalConsumers.current();
        totalConsumers.increment();

        users[msg.sender] = User({
            id: id,
            username: "Bruhno",
            uriIMG: "https://www.zupimages.net/up/23/08/tus4.jpeg",
            addr: msg.sender,
            isValid: true,
            totalCertifs: 0
        });

        emit Register(msg.sender);
    }

    // Register NFT (id) to a User (address)
    function registerConsumerToCollection(
        uint256 _collection_id
    ) public userAccess {
        require(
            userRegistredOnCollection[msg.sender][_collection_id] == false,
            "Vous etes deja inscrit a la collection"
        );

        // authorize user to access in collection
        userRegistredOnCollection[msg.sender][_collection_id] = true;

        // Increment consumer in collection
        collections[_collection_id].totalConsumers += 1;

        // Add user in first dans le premier nft
        // registerConsumerToNFT(nftCollectionsARR[0]);
    }

    // Register NFT (id) to User (address) (public)
    function registerConsumerToCour(uint256 _nft_id) public userAccess {
        require(
            userRegistredOnCour[msg.sender][_nft_id] == false,
            "Vous etes deja inscrit a se Cour"
        );

        userRegistredOnCour[msg.sender][_nft_id] = true;
    }

    // ------------------------------------------------------------

    // Get Infos Collection By ID (public)
    function getUserInfo(
        address _addr
    ) public view userAccess returns (User memory) {
        return (users[_addr]);
    }

    // Get * collections ids (public)
    function getCollections()
        public
        view
        userAccess
        returns (Collection[] memory)
    {
        Collection[] memory arr = new Collection[](totalCollections.current());

        for (uint256 i = 0; i < totalCollections.current(); i++) {
            arr[i] = collections[i];
        }

        return (arr);
    }

    // Get Infos Collection By ID (public)
    function getCollectionInfo(
        uint256 _id
    ) public view userAccess returns (Collection memory) {
        return (collections[_id]);
    }

    // Get NFTs ids in Collections (owner or customer)
    function getCoursInCollection(
        uint256 _collection_id
    ) public view userAccessOnCollection(_collection_id) returns (Cour[] memory) {
        require(
            userRegistredOnCollection[msg.sender][_collection_id] == true,
            "Vous etes pas inscrit pour cette collection"
        );

        Cour[] memory arr = new Cour[](collections[_collection_id].totalSupply);
        uint256 index;

        for (uint256 i = 0; i < totalCours.current(); i++) {
            if (cours[i].collection_id == _collection_id) {
                arr[index] = cours[i];
                index++;
            }
        }

        return (arr);
    }

    // Get NFT Infos (owner or customer)
    function getCour(uint256 _id) public view userAccess returns (Cour memory) {
        require(
            userRegistredOnCour[msg.sender][_id] == true,
            "Vous etes pas inscrit pour ce Cour"
        );

        return (cours[_id]);
    }

    // Manage Collection (public)
    function createCollection(
        string memory _title,
        string memory _uriIMG
    ) public onlyOwner {
        uint256 id = totalCollections.current();
        totalCollections.increment();

        collections[id] = Collection({
            id: id,
            title: _title,
            uriIMG: _uriIMG,
            author: msg.sender,
            price: 1,
            totalSupply: 0,
            totalConsumers: 0
        });

        // Access collection
        userRegistredOnCollection[msg.sender][id] = true;
    }

    // Mint (public)
    function mint(
        string memory _title,
        string memory _uriIMG,
        uint256 _collection_id,
        uint256 _position
    ) public onlyOwner {
        require(
            collections[_collection_id].id == _collection_id,
            "_collection_id is invalid !"
        );

        uint256 cour_id = totalCours.current();
        totalCours.increment();

        cours[cour_id] = Cour({
            id: cour_id,
            title: _title,
            uriIMG: _uriIMG,
            author: msg.sender,
            collection_id: _collection_id,
            position: _position
        });

        collections[_collection_id].totalSupply += 1;

        _safeMint(msg.sender, cour_id);

        // // Access to NFT
        // userRegistredOnCour[msg.sender][cour_id] = true;
    }
}
