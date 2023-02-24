import { Box, Button, Flex, FormControl, FormLabel, Input, Spacer, Stack, Text } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";

// Component
import ListCollection from "./ListCollection";

export const KushNFTInfo = (props: any) => {
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()
    console.log('KushNFTInfo', account)

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)
    let T: any[] = []

    const [listNFT, setListNFT] = useState(T)
    const [titleNFT, setTitleNFT] = useState("")
    const [uriIMGNFT, setUriIMGNFT] = useState("https://www.zupimages.net/up/23/08/tus4.jpeg")
    const [idCollectionForNFT, setIDCollectionForNFT] = useState("")
    const [titleCollection, setTitleCollection] = useState("")
    const [uriIMGCollection, setUriIMGCollection] = useState("https://www.zupimages.net/up/23/08/tus4.jpeg")
    const [supplyNFT, setSupplyNFT] = useState("")
    const [supplyCollection, setSupplyCollection] = useState("")
    const [collections, setCollections] = useState([])

    const loadContract = async () => {
        setSupplyNFT((await kushNFT.getTotalSupplyNFT()).toString())
        setSupplyCollection((await kushNFT.getTotalSupplyCollection()).toString())
        setCollections((await kushNFT.getCollectionsIDs()))
        console.log('getCollection', collections, props, (await kushNFT.getCollectionsIDs()))

        for (let i = 0; i < Number(supplyCollection); i++) {
            let col = await kushNFT.getCollectionInfo(i.toString())

            let obj = {
                id: Number(col[0]),
                title: col[1],
                author: col[2],
                totalSupply: Number(col[3])
            }

            setListNFT([...listNFT, obj])
        }
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    useEffect(() => {
        console.log('listNFT', listNFT)
    }, [listNFT])

    const createCollection = async () => {
        console.log('createCollection', titleCollection)
        await kushNFT.connect(signer).createCollection(titleCollection, uriIMGCollection)
    }

    const createNFT = async () => {
        console.log('createNFT', account, idCollectionForNFT, titleNFT)
        await kushNFT.connect(signer).mint(account, idCollectionForNFT, titleNFT, uriIMGNFT)
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
                    unicorn: https://www.zupimages.net/up/23/08/tus4.jpeg
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    html: https://www.zupimages.net/up/23/08/rt0i.png
                </Text>
                <Text fontSize={'lg'} color={'gray.600'}>
                    css: https://www.zupimages.net/up/23/08/dise.png
                </Text>

            </Box>

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

            {collections.length > 0 &&
                collections.map((el) => (
                    <ListCollection key={el} collection_id={el} indexCollection/>
                ))
            }


        </Box>
    )
}