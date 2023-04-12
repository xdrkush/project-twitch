import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import { EthersContext } from './ethersProvider';
import { TokenContext } from './tokenProvider';
import { ErrorContext } from './errorProvider';

import { config } from "../config";
import { KushFaucetABI } from "../config/KushFaucetABI"
import { KushABI } from "../config/KushABI"

interface FaucetContextType {
    addressSC: string | null;
    balance: string | null;
    claimFaucet: () => void;
    faucetIsConnected: boolean | null;
}

const FaucetContext = createContext<FaucetContextType>({
    addressSC: null,
    balance: null,
    claimFaucet: () => { },
    faucetIsConnected: false
});

interface FaucetProviderProps {
    children: React.ReactNode;
}

const FaucetProvider: React.FC<FaucetProviderProps> = ({ children }) => {
    const { provider, signer } = useContext(EthersContext);
    const { token, name } = useContext(TokenContext);
    const { setError } = useContext(ErrorContext);

    const [addressSC, setAddressSC] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [faucet, setFaucet] = useState<any | null>(null);
    const [faucetIsConnected, setFaucetIsConnected] = useState<boolean | null>(null);
    
    console.log('faucet provider', name)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!provider || !token.address) {
                    setFaucetIsConnected(false);
                    setError("NO_ETH_BROWSER_WALLET or NO_LOAD_CONTRACT_TOKEN");
                    return;
                }

                const accounts = await provider.listAccounts();

                if (accounts.length > 0) {
                    
                    const KushToken = new ethers.Contract(config.token, KushABI, provider);
                    const token = KushToken.connect(provider);
                    console.log('OOPS', token)

                    const KushFaucet = new ethers.Contract(config.faucet, KushFaucetABI, provider);
                    const faucet = KushFaucet.connect(provider);
                    const balance = ethers.utils.formatEther(await token.balanceOf(config.faucet));

                    setAddressSC(faucet.address);
                    setBalance(balance);
                    setFaucet(faucet)
                    setFaucetIsConnected(true);

                    const updateBalance = async () => {
                        const _balance = ethers.utils.formatEther(await token.balanceOf(config.faucet));
                        setBalance(_balance);
                    };

                    console.log('Tokennenenennn !!!', token)

                    token.on('Transfer', (from, to, value) => {
                        if (from === faucet.address || to === faucet.address) {
                            updateBalance();
                        }
                    });

                }
            } catch (err: any) {
                setFaucetIsConnected(false);
                setError(err.message);
                console.error(err);
            }
        };

        fetchData();

    }, [provider, token]);

    const claimFaucet = async () => {
        try {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const faucetWithSigner = faucet.connect(signer);
            await faucetWithSigner.claim();

        } catch (err: any) {
            console.log('error claim', err.message)
            setError(err.message)
        }
    }

    const values: FaucetContextType = {
        addressSC,
        balance,
        claimFaucet,
        faucetIsConnected
    };

    return <FaucetContext.Provider value={values}>{children}</FaucetContext.Provider>;
};

export { FaucetContext, FaucetProvider };