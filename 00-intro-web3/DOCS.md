# Docs

# Default Hardhat

addr1: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
addr2: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

# Error

si vous avez l'erreur ci-dessous, quand vous deployer un contrat depuis remix avec metamask.

```sh
Nonce too high. Expected nonce to be 0 but got 1. Note that transactions can't be queued when automining.
```

Enfète ça viens du faites que vous avez du redémarrer votre blockchain hardhat et quand vous utiliser metamask pour vous connecter il ne connais votre wallet, enfin pas sur la nouvelle chain qui à été lancer donc vous devez re-initialiser votre compte dans metamask.

  - https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd