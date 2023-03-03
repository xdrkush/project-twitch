# 00-intro-web3

# Pré-requis

  - Node >= 18.x.x
  - hardhat
  - npx : `npm i -g npx` (essaie avec sudo ?)

# Init & Install

```sh
git clone <repo>
cd <repo>
npm i
cd packages/hardhat-project
npx hardhat # enter enter enter enter
cd ../..
```

Rajouter le code ci-dessous dans `packages/hardhat-project/package.json`:

```json
{
    <default data>,

    "scripts": {
      "help": "npx hardhat help",
      "test": "npx hardhat test",
      "blk": "npx hardhat node",
      "deploy": "npx hardhat run scripts/deploy.js --network localhost",
      "clean": "npx hardhat clean"
    }
}
```

# Run

### Test unitaire contrat

```sh
npm run test
```

### Blockchain local de hardhat

```sh
npm run blk
```

### Deployer le contrat sur la blockchain de hardhat

```sh
npm run test
```

### Dapp

```sh
npm run dapp
```

# Docs

Hardhat:
  - doc: https://hardhat.org/hardhat-runner/docs/getting-started#installation
  - openzepplin: https://docs.openzeppelin.com/upgrades-plugins/1.x/hardhat-upgrades
