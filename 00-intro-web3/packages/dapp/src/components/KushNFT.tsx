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
    const [idCollectionForNFT, setIDCollectionForNFT] = useState("")
    const [titleCollection, setTitleCollection] = useState("")
    const [supplyNFT, setSupplyNFT] = useState("")
    const [supplyCollection, setSupplyCollection] = useState("")

    const loadContract = async () => {
        setSupplyNFT((await kushNFT.getTotalSupplyNFT()).toString())
        setSupplyCollection((await kushNFT.getTotalSupplyCollection()).toString())
        console.log('getCollection', (await kushNFT.getCollectionInfo("0")))

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
        await kushNFT.connect(signer).createCollection(titleCollection)
    }

    const createNFT = async () => {
        console.log('createNFT', account, idCollectionForNFT, titleNFT)
        await kushNFT.connect(signer).mint(account, idCollectionForNFT, titleNFT)
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
            </Box>


            <Stack spacing={8} mx={'auto'} minW={'lg'} py={12} px={6}>

                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Flex w={"100%"}>
                        <Spacer />
                        <Box>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" onChange={(e) => setTitleCollection(e.target.value)} />
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
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" onChange={(e) => setTitleNFT(e.target.value)} />
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

            {Number(supplyCollection) > 0 && 
                Array.from(Array(Number(supplyCollection)).keys()).map((el) => (
                    <ListCollection key={el} collection_id={el} />
            ))}

            
        </Box>
    )
}