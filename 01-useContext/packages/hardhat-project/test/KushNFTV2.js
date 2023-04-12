// Importation des bibliothèques nécessaires
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

// Définition des tests
describe("KushNFT", () => {

    // beforeEach(async function () {
    //     // Déploiement du contrat ERC721
    //     const KushNFT = await ethers.getContractFactory("KushNFT");
    //     kushNFT = await KushNFT.deploy("KushNFT", "KUSH");
    //     // await kushNFT.deployed();

    //     // Obtention des comptes pour les tests

    // });

    async function deployContractFixture() {
        // Déploiement du contrat ERC20
        const supply = hre.ethers.utils.parseEther("21000000");
        const KushToken = await ethers.getContractFactory("KushToken");
        const kushToken = await KushToken.deploy(supply);
        await kushToken.deployed();

        // Deploy & exec contract in test
        const KushNFT = await ethers.getContractFactory("KushNFT");
        const kushNFT = await KushNFT.deploy("KushNFT", "KUSH", kushToken.address);
        await kushNFT.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();

        // Provider
        const addr1Provider = kushNFT.connect(addr1);

        // Build base

        // Create Collection
        // (title, uriIMG)
        await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg');
        await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg');

        // Create NFTs (in collection)
        // (idCollection, title, uriIMG)
        await kushNFT.mint(0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg', 0);
        await kushNFT.mint(0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg', 1);
        await kushNFT.mint(1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg', 0);
        await kushNFT.mint(1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg', 1);

        // Register, Owner, No-Owner
        await kushNFT.registerConsumer()
        await addr1Provider.registerConsumer()

        // Fixtures can return anything you consider useful for your tests
        return { kushToken, kushNFT, owner, addr1, addr2};
    }

    describe("NFT contract information erc721", () => {
        // Check contract
        it("Name, Symbol, addressERC20", async () => {
            const { kushToken, kushNFT } = await loadFixture(deployContractFixture);

            expect(await kushNFT.name()).to.equal("KushNFT");
            expect(await kushNFT.symbol()).to.equal("KUSH");
            expect(await kushNFT.getAddressToken()).to.equal(kushToken.address);
        });
    })

    describe("NFT Collection & Use Case", () => {

        // Check if collection is good for owner
        it("CHECK Supply Collections/Cours/Consumers/Certifs", async () => {
            // Fixture
            const { kushNFT } = await loadFixture(deployContractFixture);

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalCours()).to.equal(4)
            expect(await kushNFT.getTotalCollections()).to.equal(2)
            expect(await kushNFT.getTotalUsers()).to.equal(2)
            expect(await kushNFT.getTotalCertifs()).to.equal(0)

        })

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER User / Owner & NO-owner", async () => {
            // Fixture
            const { kushNFT, addr2 } = await loadFixture(deployContractFixture);

            // Provider / No-Owner
            const addr2Provider = kushNFT.connect(addr2);
            await addr2Provider.registerConsumer()

            // Get data
            const totalConsumers = await kushNFT.getTotalUsers();
            const [id, username, img, addr, valid, total] = await addr2Provider.getUserInfo(addr2.address);

            // Get Information (totalConsumers)
            expect(Number(totalConsumers)).to.equal(3)
            // Info user
            expect(Number(id)).to.equal(2)
            expect(username).to.equal("Bruhno")
            expect(valid).to.equal(true)
            expect(addr).to.equal(addr2.address)
            expect(Number(total)).to.equal(0)

        })

        // Check collections ids with owner
        it("GET Collections IDs with owner", async () => {
            // Fixture
            const { kushNFT, owner } = await loadFixture(deployContractFixture);
            // Get data
            const collections = await kushNFT.getCollections();
            // List collections
            expect(typeof collections).to.equal(typeof [])
            // collection info
            expect(typeof collections[0]).to.equal(typeof [])

            // Collection Info (collections[1][0] = col2.id)
            const [id, title, author, img, price, supplyCours, supplyConsumers] = await kushNFT.getCollectionInfo(collections[1][0]);

            // Info collection
            expect(Number(id)).to.equal(Number(1))
            expect(title).to.equal("col2")
            expect(author).to.equal(owner.address)
            expect(Number(price)).to.equal(Number(1))
            expect(Number(supplyCours)).to.equal(Number(2))
            expect(Number(supplyConsumers)).to.equal(Number(0))

        });

        // Check collections ids with owner
        it("GET Collections IDs with NO-owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1);
            // Get data
            const collections = await addr1Provider.getCollections();
            // List collections
            expect(typeof collections).to.equal(typeof [])
            
            const [id, title, author, img, price, supplyCours, supplyConsumers] = await kushNFT.getCollectionInfo(collections[1][0]);

            // Info collection
            expect(Number(id)).to.equal(Number(1))
            expect(title).to.equal("col2")
            expect(author).to.equal(owner.address)
            expect(Number(price)).to.equal(Number(1))
            expect(Number(supplyCours)).to.equal(Number(2))
            expect(Number(supplyConsumers)).to.equal(Number(0))

        });

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER to Collection with NO-Owner", async () => {
            const col = 1
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Register
            await addr1Provider.registerConsumerToCollection(col);
            // Get data
            const [cour] = await addr1Provider.getCoursInCollection(col);

            // Get Information (Cour & Collection)
            expect(Number(cour[0])).to.equal(Number(2))
            // Get Infos collection
            const [id, title, author, img, price, supplyCours, supplyConsumers] = await kushNFT.getCollectionInfo(col);
            // Check increment user in collection
            expect(Number(supplyConsumers)).to.equal(Number(1))

        })

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER to Cour with NO-Owner", async () => {
            const col = 1;
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Register Collection
            await addr1Provider.registerConsumerToCollection(col);

            // Register Cour
            await addr1Provider.registerConsumerToCour(2);

            // Get data
            const [id, title, img, author, col_id, posi] = await addr1Provider.getCour(2);

            // Get Information (NFT & Collection)
            expect(title).to.equal("nft1-col2")

        })

    })

    describe("NFT INFO Use Case", () => {
 
        // Check informations nft with no-owner, register to collection, cour
        it("INFO User register", async () => {
            // Fixture
            const { kushNFT } = await loadFixture(deployContractFixture);

            // Get data
            const totalUsers = await kushNFT.getTotalUsers();

            // Get Information (totalConsumers)
            expect(totalUsers).to.equal(Number(2))

        })

        // Check information user with owner
        it("INFO USER with owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployContractFixture);

            // Get data
            const [id, name, img, addr, valid, total] = await kushNFT.getUserInfo(owner.address);

            // Get Information (NFTs)
            expect(Number(id)).to.equal(0)
            expect(addr).to.equal(owner.address)
            expect(valid).to.equal(true)
            expect(total).to.equal(Number(0))

        });

        // Check information user with NO-owner
        it("INFO USER with NO-owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployContractFixture);

            const addr1Provider = kushNFT.connect(addr1.address)

            // Get data
            const [id, name, img, addr, valid, total] = await addr1Provider.getUserInfo(owner.address);

            // Get Information (NFTs)
            expect(Number(id)).to.equal(0)
            expect(addr).to.equal(owner.address)
            expect(valid).to.equal(true)
            expect(total).to.equal(Number(0))

        });

        // Check information nft with owner
        it("INFO Cour with owner", async () => {
            const col = 0, cour = 1;
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Register Collection
            await addr1Provider.registerConsumerToCollection(col);

            // Register Cour
            await addr1Provider.registerConsumerToCour(cour);

            // Get data
            const [id, title, img, author, col_id, posi] = await addr1Provider.getCour(cour);


            // Get Information (Cours)
            expect(Number(id)).to.equal(1)
            expect(title).to.equal("nft2-col1")
            // expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            // expect(author).to.equal(owner.address)
            // expect(Number(col_id)).to.equal(0)
            // expect(Number(posi)).to.equal(2)

        });

        // Check if collection create by owner & access
        it("INFO Collection with owner", async () => {
            // Fixture
            const { kushNFT, owner } = await loadFixture(deployContractFixture);
            // Get data
            const [id, title, author, img, price, supplyCours, supplyConsumers] = await kushNFT.getCollectionInfo(0);

            // Get Information (Collection)
            expect(Number(id)).to.equal(0)
            expect(title).to.equal("col1")
            expect(author).to.equal(owner.address)
            expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(Number(price)).to.equal(1)
            expect(Number(supplyCours)).to.equal(2)
            expect(Number(supplyConsumers)).to.equal(0)
        });

        // Check if collection create by owner & access
        it("INFO Collection with NO-owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Get data
            const [id, title, author, img, price, supplyCours, supplyConsumers] = await addr1Provider.getCollectionInfo(0);

            // Get Information (Collection)
            expect(Number(id)).to.equal(0)
            expect(title).to.equal("col1")
            expect(author).to.equal(owner.address)
            expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(Number(price)).to.equal(1)
            expect(Number(supplyCours)).to.equal(2)
            expect(Number(supplyConsumers)).to.equal(0)
        });
    });

    describe("Manage error", () => {

        it("GET Collection with no-owner - no register", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Get Informations
            await expect(addr1Provider.getCoursInCollection(0))
                .to.be.revertedWith("Vous n etes pas inscrit sur cette collection")
        })

        it("GET NFT with no-owner - no register", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployContractFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Get Informations
            await expect(addr1Provider.getCour(1))
                .to.be.revertedWith("Vous n etes pas inscrit sur ce cour")
        })

    })

});