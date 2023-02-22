import { Box, Button, Container, Flex, Heading, Highlight, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { ethers } from "ethers";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import { config } from "../config";
import { KushNFTABI } from "../config/KushNFTABI";
import { features } from "process";

// Components
import CardNFT from "./CardNFT";

export default function ListCollection(props: any) {
    const { collection_id } = props
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()

    const KushNFT = new ethers.Contract(config.nft, KushNFTABI, provider)
    const kushNFT = KushNFT.connect(provider)

    type C = { id: number, title: string, author: string, totalSupply: number };

    const [collection, setCollection] = useState<C>()
    const [listIdNFTs, setListIdNFTs] = useState([])

    const loadContract = async () => {
        console.log('getCollection', (await kushNFT.getCollectionInfo(collection_id)))
        const col = await kushNFT.getCollectionInfo(collection_id.toString())
        setCollection({ id: Number(col[0]), title: String(col[1]), author: String(col[2]), totalSupply: Number(col[3]) })
        setListIdNFTs(await kushNFT.getCollectionIndexs(collection_id.toString()))
        console.log('ICICICI', listIdNFTs)
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

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
                            {Number(collection.totalSupply) > 0 &&
                                listIdNFTs.map((el) => (
                                    <CardNFT key={Number(el)} nft_id={String(el)} collection_id={collection.id} />
                                ))}

                        </Flex>
                    </Container>
                </>
            )}
        </Box >
    )
}