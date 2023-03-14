// Importation des bibliothèques nécessaires
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
// Définition des tests
describe("KushToken", () => {

    async function deployTokenFixture() {
        // Déploiement du contrat ERC20
        const supply = hre.ethers.utils.parseEther("21000000");
        const KushToken = await ethers.getContractFactory("KushToken");
        const kushToken = await KushToken.deploy(supply);
        await kushToken.deployed();

        // Obtention des comptes pour les tests
        const [owner, addr1, addr2] = await ethers.getSigners();

        return { kushToken, owner, addr1, addr2 };
    };

    describe("Name, Symbol", () => {
        // Check token
        it("should have correct name and symbol", async () => {
            const { kushToken } = await loadFixture(deployTokenFixture);
            expect(await kushToken.name()).to.equal("KushToken");
            expect(await kushToken.symbol()).to.equal("KUSH");
        });
    })

    describe("Balance insuficent for TX", () => {
        // Check balance for transfer
        it("Should fail if sender doesn't have enough tokens", async function () {
            const { kushToken, addr1, addr2 } = await loadFixture(deployTokenFixture);
            // Try to transfer more tokens than sender has
            await expect(kushToken.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("21000001"))).to.be.revertedWith(
                "ERC20: transfer amount exceeds balance"
            );
        });
    })

    describe("Transfer", () => {
        // Check transfer good condition
        it("should transfer tokens between accounts", async () => {
            const { kushToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
            // Transfert de tokens de l'owner vers addr1
            await kushToken.transfer(addr1.address, 1000);

            // Vérification des soldes
            expect(Number(await kushToken.balanceOf(owner.address))).to.equal(Number(20999999999999999999999000));
            expect(await kushToken.balanceOf(addr1.address)).to.equal(1000);

            // Transfert de tokens de addr1 vers addr2
            await kushToken.connect(addr1).transfer(addr2.address, 100);

            // Vérification des soldes
            expect(await kushToken.balanceOf(addr1.address)).to.equal(900);
            expect(await kushToken.balanceOf(addr2.address)).to.equal(100);
        });
    })
});