import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";
import ListCollection from "../components/ListCollection";
import { NotConnected } from "../components/NotConnected";

// 
// !!!  En cours !!!
// 

export const KushCollectionIDPage = () => {
    const { id } = useParams()
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string, author: string, uriIMG: string, totalSupply: number };

    const [collection, setCollection] = useState<C>()

    const loadContract = async () => {
        console.log('getNFT', id)
        const [idCol, title, author, img, supply] = await kushNFT.getCollectionInfo(id)
        setCollection({ id: Number(idCol), title: String(title), author: String(author), uriIMG: String(img), totalSupply: Number(supply) })
    }

    useEffect(() => {
        if (!window.ethereum)
            return

        return () => {
            loadContract()
        }
    }, [])

    return (
        <Box>
            <Box p='4' w="full">
                {siteConnected ? collection && (
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
                ) : (
                    <NotConnected text="Vous n'êtes pas connecté a metamask, ou au contrat NFT" />
                )}
            </Box>

            {collection && (
                <ListCollection collection_id={Number(collection.id)} />
            )}

        </Box>
    )
}