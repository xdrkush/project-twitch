import { useContext, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';

export const CreateCollection = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { nftIsConnected, createCollection, isOwner } = useContext(NFTContext);

    const [title, setTitle] = useState("")
    const [uriIMG, setUriIMG] = useState("https://www.zupimages.net/up/23/08/tus4.jpeg")

    console.log('create Collection')

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>

                {!isConnected && (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                )}

                {!nftIsConnected && (
                    <Text> Le contrat n'est pas connecté </Text>
                )}

                {!isOwner && (
                    <Text> Vous devez être owner pour créer une collection ou un NFT </Text>
                )}

                {isConnected && nftIsConnected && isOwner && (
                    <Box>
                        <Text>Create Collection</Text>

                        <Box>
                            <Flex
                                mt="2"
                                position="relative"
                                minH="250px"
                                borderRadius="7"
                                backgroundImage={
                                    `url(${uriIMG})`
                                }
                                backgroundSize={'cover'}
                                backgroundPosition={'center center'} />
                            <FormControl mt="2">
                                <FormLabel>Title</FormLabel>
                                <Input type="text" onChange={(e) => setTitle(e.target.value)} />
                            </FormControl>
                            <FormControl mt="2">
                                <FormLabel>URL IMG</FormLabel>
                                <Input type="text" onChange={(e) => setUriIMG(e.target.value)} />
                            </FormControl>
                            <Button
                                mt="5"
                                bg={'primary.500'}
                                color={'white'}
                                onClick={() => createCollection(title, uriIMG)}
                                _hover={{
                                    bg: 'primary.900',
                                }}>
                                Create Collection
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};