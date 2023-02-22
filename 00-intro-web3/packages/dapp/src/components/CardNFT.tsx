import { Box, Button, Container, Link, Flex, Heading, Highlight, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";
import { features } from "process";

// 
// !!!  En cours !!!
// 

export default function CardNFT(props: any) {
    const { nft_id, collection_id } = props
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string };

    const [NFT, setNFT] = useState<C>()

    const loadContract = async () => {
        console.log('getNFT', collection_id, nft_id)
        const col = await kushNFT.getNFT(nft_id)
        console.log('getNFT 2', col)
        setNFT({ id: Number(col[0]), title: String(col[1]) })
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    return (
        <Box p='4' w="full">

            {NFT && (

                <Link
                    p={2}
                    href={`#/nft/${NFT.id}`}
                    fontSize={'md'}
                    fontWeight={500}
                    _hover={{ textDecoration: 'none' }}
                    color={'primary'}>
                    <Flex
                        position="relative"
                        minH="250px"
                        borderRadius="7"
                        backgroundImage={
                            'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
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
                                        {NFT.id} :: {NFT.title}
                                    </Text>
                                </Box>
                            </Stack>
                        </VStack>
                    </Flex>
                </Link>
            )}
        </Box>
    )
}