import { useContext, useEffect } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';
import { useParams } from 'react-router-dom';

export const HeroCollection = () => {
    const { id } = useParams();
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { nftIsConnected, accessUser, getCollectionInfo, collectionInfo, registerToCollection } = useContext(NFTContext);

    console.log('hero Collection', collectionInfo)

    useEffect(() => {
        if (accessUser && id) {
            getCollectionInfo(id)
        }
    }, [accessUser])

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected || !nftIsConnected || !collectionInfo ? (
                    <>
                        {!isConnected && (
                            <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                        )}

                        {!nftIsConnected && (
                            <Text> Le contrat n'est pas connecté </Text>
                        )}

                        {!accessUser && (
                            <Text> Vous n'êtes pas inscrit </Text>
                        )}
                    </>
                ) : (
                    <Box textAlign="center">

                        <Box pb="2">
                            <Text>{id} : {collectionInfo.title}</Text>
                            <Text>{collectionInfo.author}</Text>
                            <Text>price: {Number(collectionInfo.price)}</Text>
                            <Text>TotalSupply: {Number(collectionInfo.totalSupply)}</Text>
                            <Text>TotalConsumers: {Number(collectionInfo.totalConsumers)}</Text>
                        </Box>

                        {accessUser && (
                            <Button
                                mt="5"
                                bg={'primary.500'}
                                color={'white'}
                                onClick={() => registerToCollection(id)}
                                _hover={{
                                    bg: 'primary.900',
                                }}>
                                S'inscrire
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    );
};