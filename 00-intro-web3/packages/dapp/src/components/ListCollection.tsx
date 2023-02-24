import { Box, Button, Container, Flex, Heading, Link, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { ethers } from "ethers";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";

// Components
import CardNFT from "./CardNFT";

export default function ListCollection(props: any) {
    const { collection_id, indexCollection } = props
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string, author: string, uriIMG: string, totalSupply: number, tokenIndexs: any[] };

    const [collection, setCollection] = useState<C>()

    const loadContract = async () => {
        console.log('getCollection', (await kushNFT.getCollectionInfo(collection_id)))
        const col = await kushNFT.getCollectionInfo(collection_id.toString())
        setCollection({ id: Number(col[0]), title: String(col[1]), author: String(col[2]), uriIMG: String(col[3]), totalSupply: Number(col[4]), tokenIndexs: Array(...col[5]) })
        console.log('ICICICI', collection, col)
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    const registerCollection = async () => {
        await kushNFT.connect(provider).registerConsumerToCollection(collection?.id)
    }

    return (
        <Box id="inprogress">
            {collection && (
                <>
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={'3xl'}>
                            {(collection.id + " :: " + collection.title)}
                        </Heading>
                        <Text color={'gray.600'} fontSize={'xl'}>
                            totalSupply: {collection.totalSupply} / By: {collection.author}
                        </Text>
                    </Stack>

                    <Container maxW={'6xl'} mt={10}>
                        <Flex display={{ md: "flex" }} justify="center">
                            {indexCollection && (
                                <Box p='4' w="full">
                                    <Link
                                        p={2}
                                        href={`#/collection/${collection.id}`}
                                        fontSize={'md'}
                                        fontWeight={500}
                                        _hover={{ textDecoration: 'none' }}
                                        color={'primary'}>
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
                                    </Link>
                                </Box>
                            )}
                            {collection.tokenIndexs.length > 0 ?
                                collection.tokenIndexs.map((el) => (
                                    <CardNFT key={Number(el)} nft_id={String(el)} collection_id={collection.id} />
                                )) : (
                                    <>
                                        <Button
                                            bg={'primary.500'}
                                            color={'white'}
                                            onClick={registerCollection}
                                            _hover={{
                                                bg: 'primary.900',
                                            }}>
                                            S'inscrire
                                        </Button>
                                    </>
                                )
                            }

                        </Flex>
                    </Container>
                </>
            )}
        </Box >
    )
}