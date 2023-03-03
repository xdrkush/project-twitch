import { Outlet } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "../Theme"
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { config } from '../config'

import { KushABI } from "../config/KushABI"

// Components
import { NavbarMain } from "../components/layouts/NavbarMain"
import { FooterMain } from "../components/layouts/FooterMain"

export const MainLayout = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const KushToken = new ethers.Contract(config.token, KushABI, provider);
    const token = KushToken.connect(provider);

    const [balance, setBalance] = useState("");
    const [account, setAccount] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [siteConnected, setSiteConnected] = useState(false);
    const [error, setError] = useState('');

    // Check isConnected()
    const handleInitialConnection = async (account: string) => {
        setAccount(account)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        const formattedBalance = ethers.utils.formatEther(balance);
        if (formattedBalance) {
            setBalance(formattedBalance.toString());
            setSiteConnected(true);
        }
    };

    const loadContract = async (account: any) => {
        const isOwner = (await token.owner() === account)
        setIsOwner(isOwner)
    }

    useEffect(() => {
        return () => {
            console.log('load Main Layout')

            const isBrowserWalletConnected = async () => {
                if (!window.ethereum)
                    throw new Error("NO_ETH_BROWSER_WALLET");

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.listAccounts();
                if (accounts?.length > 0) {
                    const account = accounts[0];
                    console.log('accounts', accounts)
                    await handleInitialConnection(account);
                    await loadContract(account);
                }
            }

            try {
                isBrowserWalletConnected();
            } catch (err: any) {
                setError(err.message);
            }
        }

    }, []);

    window.ethereum.on('accountsChanged', () => {
        window.location.reload()
    })
    window.ethereum.on('chainChanged', () => {
        window.location.reload()
    })
    window.ethereum.on('disconnect', () => {
        window.location.reload()
    })

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

    return (
        <ChakraProvider theme={theme}>

            <NavbarMain
                account={account}
                balance={balance}
                isConnected={siteConnected}
                fnConnected={handleBtnConnectSiteClick}
                isOwner={isOwner}
            />

            <Outlet context={{ provider, siteConnected, account, isOwner, signer }} /> {/* Body  */}

            <FooterMain />

        </ChakraProvider>
    )
}
