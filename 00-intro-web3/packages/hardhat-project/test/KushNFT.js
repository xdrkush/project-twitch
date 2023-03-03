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

    async function deployTokenFixture() {
        // Deploy & exec contract in test
        const KushNFT = await ethers.getContractFactory("KushNFT");
        const kushNFT = await KushNFT.deploy("KushNFT", "KUSH");
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
        await kushNFT.mint(0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg');
        await kushNFT.mint(0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg');
        await kushNFT.mint(1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg');
        await kushNFT.mint(1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg');
        // Register, Owner, No-Owner
        await kushNFT.registerConsumer()
        await addr1Provider.registerConsumer()

        // Fixtures can return anything you consider useful for your tests
        // { Contract, contractDeployed, owner, addr1, addr2 }
        return { KushNFT, kushNFT, owner, addr1, addr2 };
    }

    describe("NFT contract information erc721", () => {
        // Check contract
        it("Name, Symbol", async () => {
            const { kushNFT } = await loadFixture(deployTokenFixture);

            expect(await kushNFT.name()).to.equal("KushNFT");
            expect(await kushNFT.symbol()).to.equal("KUSH");
        });
    })

    describe("NFT Collection & Use Case", () => {

        // Check if collection is good for owner
        it("CHECK Supply Collections/Cours", async () => {
            // Fixture
            const { kushNFT } = await loadFixture(deployTokenFixture);

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFTs()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollections()).to.equal(2)

        })

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER User / Owner & NO-owner", async () => {
            // Fixture
            const { kushNFT, addr2 } = await loadFixture(deployTokenFixture);

            // Provider / No-Owner
            const addr2Provider = kushNFT.connect(addr2);
            await addr2Provider.registerConsumer()

            // Get data
            const totalConsumers = await kushNFT.getTotalConsumers();
            const [id, name, img, addr, valid, total] = await addr2Provider.getUserInfo(addr2.address);

            // Get Information (totalConsumers)
            expect(Number(totalConsumers)).to.equal(3)
            expect(Number(id)).to.equal(2)
            expect(valid).to.equal(true)
            expect(addr).to.equal(addr2.address)

        })

        // Check collections ids with owner
        it("GET Collections IDs with owner", async () => {
            // Fixture
            const { kushNFT, owner } = await loadFixture(deployTokenFixture);
            // Get data
            const collections = await kushNFT.getCollectionsIDs();
            const [id, title, author, img, supply] = await kushNFT.getCollectionInfo(1);

            // List collections
            expect(typeof collections).to.equal(typeof [])

            // Info collection
            expect(id).to.equal(Number(1))
            expect(title).to.equal("col2")
            expect(author).to.equal(owner.address)
            expect(supply).to.equal(Number(2))

        });

        // Check collections ids with owner
        it("GET Collections IDs with NO-owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1);
            // Get data
            const collections = await addr1Provider.getCollectionsIDs();
            const [id, title, author, img, supply] = await addr1Provider.getCollectionInfo(1);

            // List collections
            expect(typeof collections).to.equal(typeof [])

            // Info collection
            expect(id).to.equal(Number(1))
            expect(title).to.equal("col2")
            expect(author).to.equal(owner.address)
            expect(supply).to.equal(Number(2))

        });

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER to Collection with NO-Owner", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Register
            await addr1Provider.registerConsumerToCollection(1);
            // Get data
            const [, item] = await addr1Provider.getCollectionIndexs(1);

            // Get Information (NFT & Collection)
            expect(item).to.equal(Number(3))

        })

        // Check informations nft with no-owner, register to collection, cour
        it("REGISTER to NFT with NO-Owner", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Register
            await addr1Provider.registerConsumerToNFT(2);
            await addr1Provider.registerConsumerToNFT(3);

            // Get data
            const [id, title, img, author] = await addr1Provider.getNFT(2);

            // Get Information (NFT & Collection)
            expect(title).to.equal("nft1-col2")

        })

    })

    describe("NFT INFO Use Case", () => {

        // Check informations nft with no-owner, register to collection, cour
        it("INFO User register", async () => {
            // Fixture
            const { kushNFT } = await loadFixture(deployTokenFixture);

            // Get data
            const totalConsumers = await kushNFT.getTotalConsumers();

            // Get Information (totalConsumers)
            expect(totalConsumers).to.equal(Number(2))

        })

        // Check information user with owner
        it("INFO USER with owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployTokenFixture);

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
            const { kushNFT, owner, addr1 } = await loadFixture(deployTokenFixture);

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
        it("INFO NFT with owner", async () => {
            // Fixture
            const { kushNFT, owner } = await loadFixture(deployTokenFixture);
            // Get data
            const [id, title, img, author] = await kushNFT.getNFT(1);

            // Get Information (NFTs)
            expect(Number(id)).to.equal(1)
            expect(title).to.equal("nft2-col1")
            expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(author).to.equal(owner.address)

        });

        // Check if collection create by owner & access
        it("INFO Collection with owner", async () => {
            // Fixture
            const { kushNFT, owner } = await loadFixture(deployTokenFixture);
            // Get data
            const [id, title, author, img, supply] = await kushNFT.getCollectionInfo(0);

            // Get Information (Collection)
            expect(Number(id)).to.equal(0)
            expect(title).to.equal("col1")
            expect(author).to.equal(owner.address)
            expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(Number(supply)).to.equal(2)
        });

        // Check if collection create by owner & access
        it("INFO Collection with NO-owner", async () => {
            // Fixture
            const { kushNFT, owner, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)
            // Get data
            const [id, title, author, img, supply] = await addr1Provider.getCollectionInfo(1);

            // Get Information (Collection)
            expect(Number(id)).to.equal(1)
            expect(title).to.equal("col2")
            expect(author).to.equal(owner.address)
            expect(img).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(Number(supply)).to.equal(2)
        });
    });

    describe("Manage error", () => {

        it("GET Collection with no-owner - no register", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Get Informations
            await expect(addr1Provider.getCollectionIndexs(0))
                .to.be.revertedWith("Vous etes pas inscrit pour ce nft::collection")
        })

        it("GET NFT with no-owner - no register", async () => {
            // Fixture
            const { kushNFT, addr1 } = await loadFixture(deployTokenFixture);
            // Provider
            const addr1Provider = kushNFT.connect(addr1)

            // Get Informations
            await expect(addr1Provider.getNFT(1))
                .to.be.revertedWith("Vous etes pas inscrit pour ce nft::cour")
        })

    })

});