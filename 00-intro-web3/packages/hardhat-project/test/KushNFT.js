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
            await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Create NFTs (in collection)
            await kushNFT.mint(addr1.address, 0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)

            // Get Information (NFTs)
            expect(Number((await kushNFT.getNFT("1"))[0])).to.equal(1) // id
            expect((await kushNFT.getNFT("1"))[1]).to.equal("nft2-col1") // title
            expect((await kushNFT.getNFT("1"))[2]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg") // uriIMG

            // Get Information (Collection)
            expect(Number((await kushNFT.getCollectionInfo("0"))[0])).to.equal(0) // id
            expect((await kushNFT.getCollectionInfo("0"))[1]).to.equal("col1") // title
            expect((await kushNFT.getCollectionInfo("0"))[2]).to.equal(owner.address) // author
            expect((await kushNFT.getCollectionInfo("0"))[3]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg") // uriIMG
            expect(Number((await kushNFT.getCollectionInfo("0"))[4])).to.equal(2) // totalSupply
        });
    })

    describe("Collection With NO-Owner", () => {
        // Check if collection is good for NO-owner
        it("should have correct create collection with NO-Owner", async () => {
            // Create Collection
            await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Create NFTs (in collection)
            await kushNFT.mint(addr1.address, 0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)

            // Get Information (NFTs)
            expect(Number((await kushNFT.getNFT("1"))[0])).to.equal(1) // id
            expect((await kushNFT.getNFT("1"))[1]).to.equal("nft2-col1") // title
            expect((await kushNFT.getNFT("1"))[2]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg") // uriIMG

            // Get Information (Collection)
            expect(Number((await kushNFT.getCollectionInfo("0"))[0])).to.equal(0) // id
            expect((await kushNFT.getCollectionInfo("0"))[1]).to.equal("col1") // title
            expect((await kushNFT.getCollectionInfo("0"))[2]).to.equal(owner.address) // author
            expect((await kushNFT.getCollectionInfo("0"))[3]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg") // uriIMG
            expect(Number((await kushNFT.getCollectionInfo("0"))[4])).to.equal(2) // totalSupply
        })
    });

    describe("GET NFTs", () => {
        // Check if collection is good for NO-owner
        it("ALL ID NFT in Collection", async () => {
            // Create Collection
            await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Create NFTs (in collection)
            await kushNFT.mint(addr1.address, 0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)

            // Get Information (NFTs)
            expect((await kushNFT.getNFT(1))[1]).to.equal("nft2-col1")

            // Get Information (Collection)
            expect(Number((await kushNFT.getCollectionInfo('1'))[0])).to.equal(1)
            expect((await kushNFT.getCollectionInfo('1'))[1]).to.equal("col2")
            expect((await kushNFT.getCollectionInfo('1'))[2]).to.equal(owner.address)
            expect((await kushNFT.getCollectionInfo('1'))[3]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg")
            expect(Number((await kushNFT.getCollectionInfo('1'))[4])).to.equal(2)

            expect(Number((await kushNFT.getCollectionInfo('1'))[5][0])).to.equal(2)
            expect(Number((await kushNFT.getCollectionInfo('1'))[5][1])).to.equal(3)

            // Check if second collection has id = 1
            expect(Number((await kushNFT.getCollectionsIDs())[1])).to.equal(1)

            // Check if nft is id in collection
            expect(Number((await kushNFT.getCollectionIndexs("1"))[0])).to.equal(2)
            expect(Number((await kushNFT.getCollectionIndexs("1"))[1])).to.equal(3)

        })


        // // Check if collection is good for NO-owner
        // it("Register to Collection with NO-Owner", async () => {
        //     // Create Collection
        //     await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
        //     await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

        //     // Create NFTs (in collection)
        //     await kushNFT.mint(addr1.address, 0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
        //     await kushNFT.mint(addr1.address, 0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
        //     await kushNFT.mint(addr1.address, 1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
        //     await kushNFT.mint(addr1.address, 1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

        //     // Check Supply (Collection, NFTs)
        //     expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
        //     expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)
        //     // Get Information (Collection)
        //     // expect(Number((await kushNFT.getCollectionInfo('1'))[0])).to.equal(1)

        //     // await kushNFT.connect(addr1).registerConsumerToCollection(1)
        //     // await kushNFT.connect(addr1).registerConsumerToNFT(1)
        //     // REGISTER
        //     console.log('ICICICI',await kushNFT.test(1))

        //     // Get Information (NFTs)
        //     // expect((await kushNFT.connect(addr1).getNFT(1))[1]).to.equal("nft2-col1")

        //     // expect((await kushNFT.connect(addr1).getNFT(0))).to.fail() // isOK - not register

        // })

        // Check if collection is good for NO-owner
        it("Register to NFT with NO-Owner", async () => {
            // Create Collection
            await kushNFT.createCollection('col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.createCollection('col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Create NFTs (in collection)
            await kushNFT.mint(addr1.address, 0, 'nft1-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 0, 'nft2-col1', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft1-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')
            await kushNFT.mint(addr1.address, 1, 'nft2-col2', 'https://www.zupimages.net/up/23/08/tus4.jpeg')

            // Check Supply (Collection, NFTs)
            expect(await kushNFT.getTotalSupplyNFT()).to.equal(4)
            expect(await kushNFT.getTotalSupplyCollection()).to.equal(2)
            // Get Information (Collection)
            expect(Number((await kushNFT.getCollectionInfo('1'))[0])).to.equal(1)

            // REGISTER
            console.log("1", await kushNFT.getCollectionInfo('1'))
            // console.log("2", await kushNFT.connect(addr1).registerConsumerToNFT(1))
            // console.log("3", await kushNFT.connect(addr1).registerConsumerToCollection(1))

            // Get Information (NFTs)
            // expect(Number((await kushNFT.connect(addr1).getNFT("1"))[0])).to.equal(1) // id
            // expect((await kushNFT.connect(addr1).getNFT("1"))[1]).to.equal("nft2-col1") // title
            // expect((await kushNFT.connect(addr1).getNFT("1"))[2]).to.equal("https://www.zupimages.net/up/23/08/tus4.jpeg") // uriIMG
            // expect((await kushNFT.connect(addr1).getNFT("1"))[3]).to.equal(addr1.address) // addr in customer
            // console.log('getNFT', await kushNFT.connect(addr1).getNFT("1"))

        })
    });

});