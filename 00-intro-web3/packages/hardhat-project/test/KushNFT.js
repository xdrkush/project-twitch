// Importation des bibliothèques nécessaires
const { expect } = require("chai");

// Définition des tests
describe("KushNFT", () => {
    let kushNFT;  //: KushNFT;
    let owner;  //: Contract;
    let addr1;  //: Contract;
    let addr2;  //: Contract;

    beforeEach(async () => {
        // Déploiement du contrat ERC721
        const KushNFT = await ethers.getContractFactory("KushNFT");
        kushNFT = await KushNFT.deploy("KushNFT", "KUSH");
        await kushNFT.deployed();

        // Obtention des comptes pour les tests
        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe("Name, Symbol", () => {
        // Check contract
        it("should have correct name and symbol", async () => {
            expect(await kushNFT.name()).to.equal("KushNFT");
            expect(await kushNFT.symbol()).to.equal("KUSH");
        });
    })

    describe("Collection With Owner", () => {
        // Check if collection is good for owner
        it("should have correct create collection with Owner", async () => {
            // Create Collection
            await kushNFT.createCollection('col1')
            await kushNFT.createCollection('col2')

            // Create NFTs (in collection)
            await kushNFT.mint(owner.address, 0, 'nft1-col1')
            await kushNFT.mint(owner.address, 0, 'nft2-col1')
            await kushNFT.mint(owner.address, 1, 'nft1-col2')
            await kushNFT.mint(owner.address, 1, 'nft2-col2')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)

            // Get Information (Collection, NFTs)
            expect((await kushNFT.getNFT(1))[1]).to.equal("nft2-col1")
            expect((await kushNFT.getCollectionInfo(0))[1]).to.equal("col1")
        });
    })

    describe("Collection With NO-Owner", () => {
        // Check if collection is good for NO-owner
        it("should have correct create collection with NO-Owner", async () => {
            // Create Collection
            await kushNFT.createCollection('col1')
            await kushNFT.createCollection('col2')

            // Create NFTs (in collection)
            await kushNFT.mint(addr1.address, 0, 'nft1-col1')
            await kushNFT.mint(addr1.address, 0, 'nft2-col1')
            await kushNFT.mint(addr1.address, 1, 'nft1-col2')
            await kushNFT.mint(addr1.address, 1, 'nft2-col2')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)

            // Get Information (Collection, NFTs)
            expect((await kushNFT.getNFT(1))[1]).to.equal("nft2-col1")
            expect((await kushNFT.getCollectionInfo(0))[1]).to.equal("col1")
        })
    });
});