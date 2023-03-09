import { Box, Button, Flex, FormControl, FormLabel, Input, Spacer, Stack, Text } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";

// Component
import ListCollection from "./ListCollection";
import { NotConnected } from "./NotConnected";

export const KushNFTInfo = (props: any) => {
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)
    const userProvider = kushNFT.connect(account)

    const [titleNFT, setTitleNFT] = useState("")
    const [uriIMGNFT, setUriIMGNFT] = useState("https://www.zupimages.net/up/23/08/tus4.jpeg")
    const [idCollectionForNFT, setIDCollectionForNFT] = useState("")
    const [titleCollection, setTitleCollection] = useState("")
    const [uriIMGCollection, setUriIMGCollection] = useState("https://www.zupimages.net/up/23/08/tus4.jpeg")
    const [supplyNFT, setSupplyNFT] = useState("")
    const [supplyCollection, setSupplyCollection] = useState("")
    const [supplyConsumers, setSupplyConsumers] = useState("")
    const [supplyCertifs, setSupplyCertifs] = useState("")
    const [collections, setCollections] = useState([])


    async function loadContract() {
        const col = await userProvider.getCollectionsIDs()
        setSupplyNFT((await kushNFT.getTotalSupplyNFTs()).toString())
        setSupplyCollection((await kushNFT.getTotalSupplyCollections()).toString())
        setSupplyCertifs((await kushNFT.getTotalCertifs()).toString())
        setSupplyConsumers((await kushNFT.getTotalConsumers()).toString())
        setCollections((col))
        console.log('SetCollectionIDS', col)
    }

    useEffect(() => {
        if (!window.ethereum)
            return;

        return () => {
            loadContract()
        }
    }, [])

    const createCollection = async () => {
        console.log('createCollection', titleCollection)
        await kushNFT.connect(signer).createCollection(titleCollection, uriIMGCollection)
    }

    const createNFT = async () => {
        console.log('createNFT', account, idCollectionForNFT, titleNFT)
        await kushNFT.connect(signer).mint(idCollectionForNFT, titleNFT, uriIMGNFT)
    }

    const registerAccount = async () => {
        console.log('registerAccount', account)
        try {
            await kushNFT.connect(signer).registerConsumer()
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Box>
            <Text> Info NFT/Collection </Text>

            <Box>
                <Text fontSize={'lg'} color={'gray.600'}>
                    supplyNFT: {supplyNFT}
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    supplyCollection: {supplyCollection}
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    totalConsumers: {supplyConsumers}
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    totalCertifs: {supplyCertifs}
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    unicorn: https://www.zupimages.net/up/23/08/tus4.jpeg
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    html: https://www.zupimages.net/up/23/08/rt0i.png
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    css: https://www.zupimages.net/up/23/08/dise.png
                </Text>
            </Box>

            <Button
                bg={'primary.500'}
                color={'white'}
                onClick={registerAccount}
                _hover={{
                    bg: 'primary.900',
                }}>
                S'inscrire son compte
            </Button>

            {siteConnected ? (
                <Box>
                    <Stack spacing={8} mx={'auto'} minW={'lg'} py={12} px={6}>

                        <Box
                            rounded={'lg'}
                            boxShadow={'lg'}
                            p={8}>
                            <Flex w={"100%"}>
                                <Spacer />
                                <Box>
                                    <Flex
                                        my="5"
                                        position="relative"
                                        minH="250px"
                                        borderRadius="7"
                                        backgroundImage={
                                            `url(${uriIMGCollection})`
                                        }
                                        backgroundSize={'cover'}
                                        backgroundPosition={'center center'} />
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" onChange={(e) => setTitleCollection(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>URL IMG</FormLabel>
                                        <Input type="text" onChange={(e) => setUriIMGCollection(e.target.value)} />
                                    </FormControl>
                                    <Button
                                        bg={'primary.500'}
                                        color={'white'}
                                        onClick={createCollection}
                                        _hover={{
                                            bg: 'primary.900',
                                        }}>
                                        Create Collection
                                    </Button>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Flex
                                        my="5"
                                        position="relative"
                                        minH="250px"
                                        borderRadius="7"
                                        backgroundImage={
                                            `url(${uriIMGNFT})`
                                        }
                                        backgroundSize={'cover'}
                                        backgroundPosition={'center center'} />
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" onChange={(e) => setTitleNFT(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>URL IMG</FormLabel>
                                        <Input type="text" onChange={(e) => setUriIMGNFT(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>id_collection</FormLabel>
                                        <Input type="text" onChange={(e) => setIDCollectionForNFT(e.target.value)} />
                                    </FormControl>
                                    <Button
                                        bg={'primary.500'}
                                        color={'white'}
                                        onClick={createNFT}
                                        _hover={{
                                            bg: 'primary.900',
                                        }}>
                                        Create NFT
                                    </Button>
                                </Box>
                                <Spacer />
                            </Flex>

                        </Box>
                    </Stack>

                    {collections.length}
                    {JSON.stringify(collections)}

                    {collections.length > 0 && collections.map((el, i) => (
                        <Box key={el}>
                            <ListCollection collection_id={Number(el)} indexCollection />
                        </Box>
                    ))
                    }

                </Box>
            ) : (
                <NotConnected text="Vous n'êtes pas connecté a metamask, ou au contrat NFT" />
            )}


        </Box>
    )
}