# Docs

# Default Hardhat

addr1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
addr2: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

# Error

Erreur avec les types de "ethers", dans react 

```sh
ERROR in ./src/components/KushTokenInfo.tsx 23:23-52
export 'ethers'.'providers' (imported as 'ethers') was not found in 'ethers' (possible exports:

ou

'"ethers"' n'a aucun membre exporté nommé 'BigNumber'. Est-ce que vous pensiez à 'BigNumberish' ?

ou

La propriété 'providers' n'existe pas sur le type 'typeof import("/home/arinfo/Bureau/project-twitch/00-intro-web3/packages/dapp/node_modules/ethers/types/ethers")'

...
```
Enfète le probleme viens du faites que on utilise une librairie de ethers qui a une version très récentes

pour le corriger allez sur:
  - https://docs.ethers.org/v6-beta/getting-started/

`npm i ethers@beta-exports`

______

Deploy contract with hardhat in local:
```sh
npx hardhat run --network localhost scripts/deploy.js
```

si vous avez l'erreur ci-dessous, quand vous voulez run `npx hardhat ...` aussi si vous utiliser `npm run ...`.

______

```sh
Error HH12: Trying to use a non-local installation of Hardhat, which is not supported.
Please install Hardhat locally using npm or Yarn, and try again.
```

En gros quand vous supprimer les node_modules, ... VSC n'arrive pas à refaire la maj du cache, vous pourriez aussi avoir le probleme pour lancer la blockchain hardhat (`npx hardhat node`) pareil son cache est initialiser avec une certaine arboresence sur la machine, ce qui varie d'une machine, vous pourriez très bien reinstaller hardhat (`npx hardhat`) directement dans `<repo>/packages/hardhat-project`, dans ce cas la n'oublier de re-importer les scripts du README.md et de re-importer les contract, test, deploy, ...

  - https://stackoverflow.com/a/69973620/10442954

______

si vous avez l'erreur ci-dessous, quand vous deployer un contrat depuis remix avec metamask.

```sh
Nonce too high. Expected nonce to be 0 but got 1. Note that transactions can't be queued when automining.
```

Enfète ça viens du faites que vous avez du redémarrer votre blockchain hardhat et quand vous utiliser metamask pour vous connecter il ne connais votre wallet, enfin pas sur la nouvelle chain qui à été lancer donc vous devez re-initialiser votre compte dans metamask.
  - https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd

