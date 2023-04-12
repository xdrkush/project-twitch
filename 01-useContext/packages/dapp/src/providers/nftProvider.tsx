import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { ErrorContext } from './errorProvider';

import { EthersContext } from './ethersProvider';

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI"

interface Collection {
    id: any;
    title: any;
    uriIMG: any;
    price: any;
    author: any;
    totalConsumers: any;
    totalSupply: any;
}

interface Cour {
    id: any;
    title: any;
    uriIMG: any;
    author: any;
    collection_id: any;
    position: any;
}

interface NFTContextType {
    addressNFT: string | null;
    name: string | null;
    symbol: string | null;
    totalSupplyNFTs: string | null;
    totalSupplyCollections: string | null;
    totalSupplyConsumers: string | null;
    totalSupplyCertifs: string | null;
    accessUser: boolean | null;
    isOwner: boolean | null;
    nftIsConnected: boolean | null;
    createCour: (title: string, uriIMG: string, collection_id: string, position: string) => void;
    createCollection: (title: string, uriIMG: string) => void;
    registerAccount: () => void;
    registerToCollection: (id: any) => void;
    registerToCour: (id: any) => void;
    listCollection: BigNumber[] | null;
    getCollections: () => void;
    collectionInfo: Collection | null;
    getCollectionInfo: (id: string) => void;
    coursInCollection: Cour[] | null;
    getCoursInCollection: (id: string) => void;
    courInfo: Cour | null;
    getCourInfo: (id: string) => void;
}

const NFTContext = createContext<NFTContextType>({
    addressNFT: null,
    totalSupplyNFTs: null,
    totalSupplyCollections: null,
    totalSupplyConsumers: null,
    totalSupplyCertifs: null,
    name: null,
    symbol: null,
    accessUser: null,
    isOwner: null,
    nftIsConnected: false,
    createCour: () => { },
    createCollection: () => { },
    registerAccount: () => { },
    registerToCollection: () => { },
    registerToCour: () => { },
    listCollection: null,
    getCollections: () => { },
    collectionInfo: null,
    getCollectionInfo: () => { },
    coursInCollection: null,
    getCoursInCollection: () => { },
    courInfo: null,
    getCourInfo: () => { }

});

interface NFTProviderProps {
    children: React.ReactNode;
}

const NFTProvider: React.FC<NFTProviderProps> = ({ children }) => {
    const { provider, signer, address } = useContext(EthersContext);
    const { setError } = useContext(ErrorContext);

    const [addressNFT, setAddressNFT] = useState<string | null>(null);
    const [totalSupplyNFTs, setTotalSupplyNFTs] = useState<string | null>(null);
    const [totalSupplyCollections, setTotalSupplyCollections] = useState<string | null>(null);
    const [totalSupplyConsumers, setTotalSupplyConsumers] = useState<string | null>(null);
    const [totalSupplyCertifs, setTotalSupplyCertifs] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [symbol, setSymbol] = useState<string | null>(null);
    const [accessUser, setAccessUser] = useState<boolean | null>(null);
    const [listCollection, setListCollection] = useState<BigNumber[] | null>(null);
    const [isOwner, setIsOwner] = useState<boolean | null>(null);
    const [nftIsConnected, setNftIsConnected] = useState<boolean | null>(null);
    const [nft, setNFT] = useState<any>({})

    const [collectionInfo, setCollectionInfo] = useState<Collection | null>(null)
    const [coursInCollection, setCoursInCollection] = useState<any | null>(null)
    const [courInfo, setCourInfo] = useState<any | null>(null)

    console.log('nft provider', addressNFT)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!provider) {
                    setNftIsConnected(false);
                    setError("NO_ETH_BROWSER_WALLET or NO_LOAD_CONTRACT_TOKEN");
                    return;
                }

                const accounts = await provider.listAccounts();
                console.log('NFT effect provider', accounts)

                if (accounts.length > 0) {
                    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider);
                    const nft = KushNFT.connect(provider);

                    const name = await nft.name();
                    const symbol = await nft.symbol()
                    const totalSupplyNFTs = await nft.getTotalCours()
                    const totalSupplyCollections = await nft.getTotalCollections()
                    const totalSupplyConsumers = await nft.getTotalUsers()
                    const totalSupplyCertifs = await nft.getTotalCertifs()
                    const userInfo = await nft.getUserInfo(address)
                    const owner = async () => address === await nft.owner()

                    setNFT(nft);
                    setAddressNFT(nft.address);
                    setAccessUser(userInfo.isValid)
                    setName(name)
                    setSymbol(symbol)
                    setTotalSupplyNFTs(totalSupplyNFTs)
                    setTotalSupplyCollections(totalSupplyCollections)
                    setTotalSupplyConsumers(totalSupplyConsumers)
                    setTotalSupplyCertifs(totalSupplyCertifs)
                    setIsOwner(await owner())

                    setNftIsConnected(true);

                    nft.on('Register', async (userAddr, isOk) => {
                        const userInfo = await nft.getUserInfo(userAddr)
                        if (userInfo.addr === address) {
                            setAccessUser(userInfo.isValid)
                        }
                    });


                }
            } catch (err: any) {
                setNftIsConnected(false);
                console.error(err);
                setError(err.message)
            }
        };

        fetchData();
    }, [provider]);

    const createCollection = async (title: any, img: any) => {
        try {
            console.log('createCollection', title)
            await nft.connect(signer).createCollection(title, img)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const createCour = async (title: any, img: any, collection_id: any, position: any) => {
        try {
            console.log('createCour', collection_id, title)
            await nft.connect(signer).mint(title, img, collection_id, position)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const registerAccount = async () => {
        console.log('registerAccount')
        try {
            await nft.connect(signer).registerConsumer()
        } catch (err: any) {
            setError(err.message)
        }
    }
    const registerToCollection = async (id: any) => {
        console.log('registerAccount')
        try {
            await nft.connect(signer).registerConsumerToCollection(id)
        } catch (err: any) {
            setError(err.message)
        }
    }
    const registerToCour = async (id: any) => {
        console.log('registerAccount')
        try {
            await nft.connect(signer).registerConsumerToCour(id)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const getCollections = async () => {
        try {
            const listCol = await nft.getCollections()
            setListCollection(listCol)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const getCollectionInfo = async (id: any) => {
        try {
            const col = await nft.getCollectionInfo(id)
            setCollectionInfo(col)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const getCoursInCollection = async (id: any) => {
        try {
            const listCours = await nft.getCoursInCollection(id)
            setCoursInCollection(listCours)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const getCourInfo = async (id: any) => {
        try {
            const col = await nft.getCour(id)
            setCourInfo(col)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const values: NFTContextType = {
        addressNFT,
        totalSupplyNFTs,
        totalSupplyCollections,
        totalSupplyConsumers,
        totalSupplyCertifs,
        name,
        symbol,
        nftIsConnected,
        accessUser,
        createCour,
        isOwner,
        listCollection,
        createCollection,
        registerAccount,
        registerToCollection,
        registerToCour,
        getCollections,
        collectionInfo,
        getCollectionInfo,
        coursInCollection,
        getCoursInCollection,
        courInfo,
        getCourInfo,
    };

    return <NFTContext.Provider value={values}>{children}</NFTContext.Provider>;
};

export { NFTContext, NFTProvider };