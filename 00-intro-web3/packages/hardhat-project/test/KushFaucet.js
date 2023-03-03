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

  describe('Deposit By Owner', () => {
    it("should have correct allowance & approve", async () => {
      const { kushToken, kushFaucet, owner } = await loadFixture(deployTokenFixture);
      // On check et effectue l'allowance
      expect(await kushToken.allowance(owner.address, kushFaucet.address)).to.equal(0)
      await kushToken.approve(kushFaucet.address, 1000000)
      expect(await kushToken.allowance(owner.address, kushFaucet.address)).to.equal(1000000)

      // On fait le deposit en tant que owner (default)
      await kushFaucet.deposit(1000)

      // On check que les token sont arriver sur le faucet
      expect(await kushToken.balanceOf(kushFaucet.address)).to.equal(1000);
      expect(await kushFaucet.getBalanceOfFaucet()).to.equal(1000);

      // On check si les balances sont coordonnée
      expect(await kushToken.allowance(owner.address, kushFaucet.address)).to.equal(999000)
      expect(Number(await kushToken.balanceOf(owner.address))).to.equal(Number(20999999999999999999999000));
    })
  })

  describe('Deposit By NO-Owner', () => {
    // Montant du deposit en ether
    const _amount = ethers.utils.parseEther('1')

    it("should have correct allowance for deposit by NO-Owner", async () => {
      const { kushToken, kushFaucet, addr1 } = await loadFixture(deployTokenFixture);
      // On prépare une transaction de notre owner vers addr1
      await kushToken.transfer(addr1.address, ethers.utils.parseEther('10'))
      // On check que les token sont arriver
      expect(Number(await kushToken.balanceOf(addr1.address))).to.equal(Number(ethers.utils.parseEther('10')))

      // On check l'allowance de addr1 avec le faucet
      expect(await kushToken.connect(addr1).allowance(addr1.address, kushFaucet.address)).to.equal(0)
      // On autorise le contrat à récupérer le montant du deposit
      await kushToken.connect(addr1).approve(kushFaucet.address, _amount)

      // On check si l'addr1 à montant supérieur au montant du deposit
      expect(Number(await kushToken.balanceOf(addr1.address))).to.above(Number(_amount))
      // On check si le faucet va bien pouvoir récupérer les token
      expect(Number(await kushToken.allowance(addr1.address, kushFaucet.address))).to.equal(Number(_amount))
      // addr1 fait le deposit
      await kushFaucet.connect(addr1).deposit(_amount)

      // On check l'arriver des token sur le faucet
      expect(Number(await kushToken.balanceOf(kushFaucet.address))).to.equal(Number(_amount))
      expect(Number(await kushFaucet.getBalanceOfFaucet())).to.equal(Number(_amount));
      // On check que addr1 à bien été débité
      expect(Number(await kushToken.balanceOf(addr1.address))).to.equal(Number(9000000000000000000))

    })
  })

  describe('Claim By NO-Owner', () => {
    it("should have correct claim for NO-Owner", async () => {
      const { kushToken, kushFaucet, owner, addr1 } = await loadFixture(deployTokenFixture);

      // On depose avec le owner
      await kushToken.allowance(owner.address, kushFaucet.address)
      await kushToken.approve(kushFaucet.address, ethers.utils.parseEther('10'))
      await kushFaucet.deposit(ethers.utils.parseEther('5'))

      // On fait le claim avec le addr1
      await kushFaucet.connect(addr1).claim()

      // On check les balances des address
      expect(Number(await kushToken.balanceOf(addr1.address))).to.equal(Number(ethers.utils.parseEther('0.1')))
      expect(Number(await kushToken.balanceOf(kushFaucet.address))).to.equal(Number(ethers.utils.parseEther('4.9')))
      expect(Number(await kushToken.balanceOf(owner.address))).to.equal(Number(ethers.utils.parseEther('20999995')))
    })
  })

});