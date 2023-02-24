import { Box, Button, Container, Flex, Heading, Highlight, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { ethers } from "ethers";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";
import { features } from "process";
import ListCollection from "../components/ListCollection";

// 
// !!!  En cours !!!
// 

export const KushCollectionIDPage = () => {
    const { id } = useParams()
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string, author: string, uriIMG: string, totalSupply: number, tokenIndexs: any[] };

    const [collection, setCollection] = useState<C>()

    const loadContract = async () => {
        console.log('getNFT', id)
        const col = await kushNFT.getCollectionInfo(id)
        console.log('getNFT 2', col)
        setCollection({ id: Number(col[0]), title: String(col[1]), author: String(col[2]), uriIMG: String(col[3]), totalSupply: Number(col[4]), tokenIndexs: Array(...col[5]) })

    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    return (
        <Box>
            <Box p='4' w="full">
                {collection && (
                    <Flex
                        position="relative"
                        minH="250px"
                        borderRadius="7"
                        backgroundImage={
                            `url(${collection.uriIMG})`
                        }
                        backgroundSize={'cover'}
                        backgroundPosition={'center center'}>
                        <VStack
                            borderRadius="7"
                            justify={'center'}
                            bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>

                            <Stack maxW={'2xl'} align={'flex-start'} spacing={6} p="3">
                                <Box textAlign="left">
                                    <Text
                                        color={'white'}
                                        fontWeight={700}
                                        lineHeight={1.2}
                                        fontSize={'xl'}>
                                        {collection.id} :: {collection.title}
                                    </Text>
                                </Box>
                            </Stack>
                        </VStack>
                    </Flex>
                )}
            </Box>

            {collection && (
                <ListCollection collection_id={collection.id} />
            )}

        </Box>
    )
}