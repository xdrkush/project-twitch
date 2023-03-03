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
    const { nft_id } = props
    const { provider, siteConnected }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string, uriIMG: string, author: string };

    const [NFT, setNFT] = useState<C>()

    const loadContract = async () => {
        const [id, title, img, author] = await kushNFT.getNFT(nft_id)
        setNFT({ id: Number(id), title: String(title), uriIMG: String(img), author: String(author) })
        console.log('NFT', provider, await kushNFT.isAuthorizedAccessNFT(nft_id))
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    return (
        <Box p='4' w="full">
            {nft_id}

            {siteConnected && NFT && (

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
                            `url(${NFT.uriIMG})`
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
                                        Cour: {NFT.id}
                                    </Text>
                                    <Text
                                        color={'white'}
                                        fontWeight={700}
                                        lineHeight={1.2}
                                        fontSize={'xl'}>
                                        {NFT.title}
                                    </Text>
                                    <Text
                                        color={'white'}
                                        fontSize={'xl'}>
                                        { '0x...' + NFT.author.slice(-5)}
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