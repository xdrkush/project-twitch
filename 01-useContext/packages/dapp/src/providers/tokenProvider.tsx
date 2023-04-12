import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import { EthersContext } from './ethersProvider';
import { ErrorContext } from './errorProvider';

import { config } from "../config";
import { KushABI } from "../config/KushABI"

interface TokenContextType {
    token: any | null,
    addressSC: string | null;
    balance: string | null;
    totalSupply: string | null;
    name: string | null;
    symbol: string | null;
    tokenIsConnected: boolean | null;
}

const TokenContext = createContext<TokenContextType>({
    token: null,
    addressSC: null,
    balance: null,
    totalSupply: null,
    name: null,
    symbol: null,
    tokenIsConnected: false
});

interface TokenProviderProps {
    children: React.ReactNode;
}

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const { address, provider } = useContext(EthersContext);
    const { setError } = useContext(ErrorContext);

    const [addressSC, setAddressSC] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [totalSupply, setTotalSupply] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [symbol, setSymbol] = useState<string | null>(null);
    const [tokenIsConnected, setTokenIsConnected] = useState<boolean | null>(null);
    const [token, setToken] = useState<any>({})

    console.log('token provider', addressSC)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!provider || !token) {
                    setTokenIsConnected(false);
                    setError("NO_ETH_BROWSER_WALLET or NO_LOAD_CONTRACT_TOKEN");
                    return;
                }

                const accounts = await provider.listAccounts();
                
                if (accounts.length > 0) {
                    const KushToken = new ethers.Contract(config.token, KushABI, provider);
                    const token = KushToken.connect(provider);

                    const balance = ethers.utils.formatEther(await token.balanceOf(address));
                    const name = await token.name();
                    const symbol = await token.symbol()
                    const totalSupply = ethers.utils.formatEther(await token.totalSupply());

                    setToken(token);
                    setAddressSC(token.address);
                    setBalance(balance);
                    setName(name)
                    setSymbol(symbol)
                    setTotalSupply(totalSupply)
                    setTokenIsConnected(true);

                    const updateBalance = async () => {
                        const _balance = ethers.utils.formatEther(await token.balanceOf(address));
                        setBalance(_balance);
                    };

                    token.on('Transfer', (from, to, value) => {
                        if (from === address || to === address) {
                            updateBalance();
                        }
                    });
                }
            } catch (err: any) {
                setTokenIsConnected(false);
                console.error(err);
                setError(err.message)
            }
        };

        fetchData();
    }, [provider]);

    const values: TokenContextType = {
        token,
        addressSC,
        balance,
        totalSupply,
        name,
        symbol,
        tokenIsConnected
    };

    return <TokenContext.Provider value={values}>{children}</TokenContext.Provider>;
};

export { TokenContext, TokenProvider };