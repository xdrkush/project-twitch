"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { WalletSelect } from "@talismn/connect-components"
import { ApiPromise, WsProvider } from "@polkadot/api";
import { OnChainRegistry, options, PinkContractPromise, signCertificate } from '@phala/sdk';
import { ContractID, ABI } from "./config"

// Address eth test 0xD0fE316B9f01A3b5fd6790F88C2D53739F80B464

const DAPP_NAME = "dapp-hello"
const RPCPhalaTestnet = "wss://poc6.phala.network/ws"

export default function Home() {
  const [account, setAccount] = useState()
  const [wallet, setWallet] = useState()
  const [api, setApi] = useState()
  const [phatRegistry, setPhatRegistry] = useState()
  const [cert, setCert] = useState()
  const [contract, setContract] = useState()
  const [addressETH, setAddressETH] = useState()
  const [getEthBalance, setGetEthBalance] = useState()

  useEffect(() => {
    if (!account) return
    (async () => {
      const { getWalletBySource } = await import('@talismn/connect-wallets');
      const wallet = await getWalletBySource(account.source);

      console.log('wallet', wallet)
      setWallet(wallet);
    })()

    initAPI()

  }, [account])

  useEffect(() => {
    if (!phatRegistry) return
    initContract()

  }, [phatRegistry])

  const initAPI = async () => {
    const provider = new WsProvider(RPCPhalaTestnet);
    const apiPromise = new ApiPromise(options({
      provider,
      noInitWarn: true
    }));
    await apiPromise.isReady;
    setApi(apiPromise);

    const phatRegistry = await OnChainRegistry.create(apiPromise)
    setPhatRegistry(phatRegistry)

    console.log(
      await apiPromise.rpc.system.chain(),
      await apiPromise.rpc.system.name(),
      await apiPromise.rpc.system.version()
    )

  }

  const initContract = async () => {
    const contractKey = await phatRegistry.getContractKeyOrFail(ContractID);
    const contract = new PinkContractPromise(api, phatRegistry, ABI, ContractID, contractKey);
    setContract(contract)

    const cert = await signCertificate({ signer: wallet?.signer, account })
    setCert(cert)

    console.log('contract', contract)

  }

  const fnGetEthBalance = async () => {
    const { output } = await contract.query.getEthBalance(cert?.address, { cert }, ["0xD0fE316B9f01A3b5fd6790F88C2D53739F80B464"])
    console.log('output', output.__internal__raw.toString())
    setGetEthBalance(output.__internal__raw.toString())
  }

  return (
    <main className={styles.main}>
      <div>
        <h2>Dapp phathello</h2>

        <br></br><br></br>

        <div>
          <h2>Connect wallet</h2>
          <h2>Connect API Phala</h2>

          <br></br><br></br>

          {!account && (
            <WalletSelect
              onlyShowInstalled
              dappName={DAPP_NAME}
              showAccountsList={true}
              triggerComponent={
                <button
                  // `onClick` is optional here
                  onClick={(wallets) => {
                    // Do stuff with the supported wallets
                  }}
                >
                  Connect to wallet
                </button>
              }

              onAccountSelected={(account) => {
                console.log('selectAccount', account)
                setAccount(account)
              }}
            />
          )}

        </div>

        {account ? (
          <div>
            <h2>Input FnGetEthBalance</h2>
            <br></br><br></br>

            <input onChange={(e) => setAddressETH(e.target.value)} />
            <button onClick={() => fnGetEthBalance(addressETH)}>Get eth balance</button>

            <br></br><br></br>
            
            {getEthBalance && getEthBalance}
          </div>
        ) : (<h4>Vous devez être connecté</h4>)}

      </div>
    </main>
  );
}
