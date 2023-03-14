import React, { createContext, useState, useEffect } from 'react';
import { ethers, Signer, providers } from 'ethers';

interface EthersContextType {
    connectToMetamask: () => void,
    provider: providers.Web3Provider | null;
    signer: Signer | null;
    address: string | null;
    balance: string | null;
    network: providers.Network | null;
    isConnected: boolean;
}

const EthersContext = createContext<EthersContextType>({
    connectToMetamask: () => { },
    provider: null,
    signer: null,
    address: null,
    balance: null,
    network: null,
    isConnected: false,
});

interface EthersProviderProps {
    children: React.ReactNode;
}

const EthersProvider: React.FC<EthersProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [network, setNetwork] = useState<providers.Network | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const initialize = async () => {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const network = await provider.getNetwork();
            const balance = ethers.utils.formatEther(await provider.getBalance(address));
            setProvider(provider);
            setSigner(signer);
            setAddress(address);
            setBalance(balance.toString());
            setNetwork(network);
            setIsConnected(true);
        };

        if (window.ethereum) {
            initialize();
            window.ethereum.on('accountsChanged', () => {
                initialize();
            });
            window.ethereum.on('chainChanged', () => {
                initialize();
            });
            // window.ethereum.on('disconnect', () => {
            //   console.log('disconnect provider')
            //   window.location.reload();
            // });
        }
    }, []);

    useEffect(() => {
        const fetchAccountData = async () => {
            if (provider) {
                try {
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        const signer = provider.getSigner();
                        const network = await provider.getNetwork();
                        const address = accounts[0];
                        const balance = ethers.utils.formatEther(await provider.getBalance(address));
                        setSigner(signer);
                        setAddress(address);
                        setBalance(balance.toString());
                        setNetwork(network);
                        setIsConnected(true);
                    } else {
                        setIsConnected(false);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchAccountData();
    }, [provider]);

    const connectToMetamask = async () => {
        try {
            // Connect to MetaMask
            const ethereum = window.ethereum;
            await ethereum.request({ method: 'eth_requestAccounts' });
            const web3Provider = new ethers.providers.Web3Provider(ethereum);
            const web3Signer = web3Provider.getSigner();

            // Update context values
            setProvider(web3Provider);
            setSigner(web3Signer);
            const address = await web3Signer.getAddress();
            setAddress(address);
            setIsConnected(true);

        } catch (error) {
            console.log(error);
        }
    };

    const values: EthersContextType = {
        connectToMetamask,
        provider,
        signer,
        address,
        balance,
        network,
        isConnected,
    };

    return <EthersContext.Provider value={values}>{children}</EthersContext.Provider>;
};

export { EthersContext, EthersProvider };