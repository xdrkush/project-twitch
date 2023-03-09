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

    // console.log('ListCollection', provider)

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)
    const userProvider = kushNFT.connect(account)

    type C = { id: number, title: string, author: string, uriIMG: string, totalSupply: number, totalConsumers: number };
    type L = {};

    const [collection, setCollection] = useState<C>()
    const [listNFTs, setListNFTs] = useState([])

    async function loadContract() {
        const [id, title, author, img, supply, totalConsumers] = await userProvider.getCollectionInfo(Number(collection_id))
        console.log('getCollection 22', account, kushNFT, Number(collection_id), title)

        const list = await userProvider.getCollectionIndexs(Number(collection_id))

        setCollection({ id: Number(id), title: String(title), author: String(author), uriIMG: String(img), totalSupply: Number(supply), totalConsumers: Number(totalConsumers) })
        setListNFTs(list)
        console.log('ListCollection', list, await kushNFT.isAuthorizedAccessCollection(collection_id))
    }

    useEffect(() => {
        if (!window.ethereum)
            return;

        return () => {
            loadContract()
        }
    }, [])

    const registerCollection = async () => {
        try {
            await kushNFT.connect(signer).registerConsumerToCollection(Number(collection_id))
            // await kushNFT.connect(signer).registerConsumerToCollection(0)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Box>

            <Button
                bg={'primary.500'}
                color={'white'}
                onClick={registerCollection}
                _hover={{
                    bg: 'primary.900',
                }}>
                S'inscrire
            </Button>
            {collection && (
                <Box>
                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={'3xl'}>
                            {(collection.id + " :: " + collection.title)}
                        </Heading>
                        <Text color={'gray.600'} fontSize={'xl'}>
                            totalSupply: {collection.totalSupply} / totalConsumers: {collection.totalConsumers} / By: {collection.author}
                        </Text>
                    </Stack>

                    <Container maxW={'6xl'} mt={10}>
                        <Flex display={{ md: "flex" }} justify="center">
                            {indexCollection && (
                                <Box p='4' w="full">

                                    {collection.id}
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

                            {listNFTs.length > 0 ?
                                listNFTs.map((el) => (
                                    <CardNFT key={String(el)} nft_id={String(el)} collection_id={collection.id} />
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
                </Box>
            )}
        </Box >
    )
}