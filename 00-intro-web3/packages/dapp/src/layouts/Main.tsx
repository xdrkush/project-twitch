import { Outlet } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "../Theme"
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';


import { KushABI } from "../config/KushABI"

// Components
import { NavbarMain } from "../components/layouts/NavbarMain"
import { FooterMain } from "../components/layouts/FooterMain"

export const MainLayout = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const KushToken = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', KushABI, provider)
    const contract = KushToken.connect(provider)

    const [balance, setBalance] = useState("");
    const [address, setAddress] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [siteConnected, setSiteConnected] = useState(false);
    const [error, setError] = useState('');


    // Check isConnected()
    const handleInitialConnection = async (account: string) => {
        setSiteConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        const formattedBalance = ethers.utils.formatEther(balance);
        if (formattedBalance) setBalance(formattedBalance.toString());
    };

    // Btn nav connected()
    async function handleBtnConnectSiteClick() {
        try {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];
            if (account) {
                await handleInitialConnection(account);
            } else {
                throw new Error("FAILED_TO_CONNECT");
            }

        } catch (err: any) {
            setError(err.message);
        }
    }

    useEffect(() => {
        console.log('layout main', siteConnected)
        const isBrowserWalletConnected = async () => {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts?.length > 0) {
                const account = accounts[0];
                await handleInitialConnection(account);
                setAddress(account)
            }
        }

        try {
            isBrowserWalletConnected();
        } catch (err: any) {
            setError(err.message);
        }

    }, [provider]);

    const loadContract = async () => {
        console.log('loadContract', await contract.owner(), address)
        // const accounts = await provider.listAccounts();
        // console.log('LoadContract', contract, accounts, await contract.balanceOf(accounts[0]))
        // setTotalSupply(`${BigNumber.from(await contract.totalSupply())}`)
        // setAddress(`${contract.address}`)
        // setAddressFaucet(`${contractFaucet.address}`)
        // setSymbol(`${await contract.symbol()}`)
        // setName(`${await contract.name()}`)
        // setBalance(`${await contract.balanceOf(signer.getAddress())}`)
        setIsOwner(await contract.owner() === address ? true : false)
    }
    useEffect(() => {
        loadContract()
    }, [])


    return (
        <ChakraProvider theme={theme}>
            <NavbarMain
                address={address}
                balance={balance}
                isConnected={siteConnected}
                fnConnected={handleBtnConnectSiteClick}
                isOwner={isOwner}
            />

            <Outlet /> {/* Body  */}

            <FooterMain />
        </ChakraProvider>
    )
}
