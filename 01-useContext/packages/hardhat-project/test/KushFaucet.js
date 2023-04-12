// Importation des bibliothèques nécessaires
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

const { expect } = require("chai");

// Définition des tests
describe("KushFaucet", () => {
  async function deployTokenFixture() {
    // Déploiement du contrat ERC20
    const supply = hre.ethers.utils.parseEther("21000000");
    const KushToken = await ethers.getContractFactory("KushToken");
    const kushToken = await KushToken.deploy(supply);
    await kushToken.deployed();

    // Déploiement Faucet
    const KushFaucet = await ethers.getContractFactory("KushFaucet");
    const kushFaucet = await KushFaucet.deploy(kushToken.address);
    await kushFaucet.deployed();

    // Obtention des comptes pour les tests
    const [owner, addr1, addr2] = await ethers.getSigners();

    return { kushToken, kushFaucet, owner, addr1, addr2 };

  };

  describe("CHECK contract", () => {
    it("Name, Symbol, BalanceOf", async () => {
      const { kushToken, kushFaucet } = await loadFixture(deployTokenFixture);

      expect(await kushToken.name()).to.equal("KushToken");

      expect(await kushToken.symbol()).to.equal("KUSH");

      expect(Number(await kushToken.balanceOf(kushFaucet.address))).to.equal(Number(0));
    });

  })

  describe('Deposit By NO-Owner', () => {
    // Montant du deposit en ether
    const _amount = ethers.utils.parseEther('1')

    it("should have correct balance (faucet)", async () => {
      const { kushToken, kushFaucet, addr1 } = await loadFixture(deployTokenFixture);
      // On prépare une transaction de notre owner vers addr1
      await kushToken.transfer(addr1.address, ethers.utils.parseEther('10'))

      // Deposit
      await kushToken.connect(addr1).transfer(kushFaucet.address, _amount)

      // On check l'arriver des token sur le faucet
      expect(Number(await kushToken.balanceOf(kushFaucet.address))).to.equal(Number(_amount))
      // On check que addr1 à bien été débité
      expect(Number(await kushToken.balanceOf(addr1.address))).to.equal(Number(9000000000000000000))

    })
  })

  describe('Claim By NO-Owner', () => {
    it("should have correct claim", async () => {
      const { kushToken, kushFaucet, owner, addr1 } = await loadFixture(deployTokenFixture);

      // On depose
      await kushToken.transfer(kushFaucet.address, ethers.utils.parseEther('5'))

      // // On fait le claim avec le addr1
      await kushFaucet.connect(addr1).claim()

      // On check les balances des address
      expect(Number(await kushToken.balanceOf(addr1.address))).to.equal(Number(ethers.utils.parseEther('0.1')))
      expect(Number(await kushToken.balanceOf(kushFaucet.address))).to.equal(Number(ethers.utils.parseEther('4.9')))
      expect(Number(await kushToken.balanceOf(owner.address))).to.equal(Number(ethers.utils.parseEther('20999995')))
    })
  })

});