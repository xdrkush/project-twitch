import { useContext, useEffect } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';
import { CardCollection } from './CardCollection'
import { Collection } from '../types';

export const ListCollection = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { nftIsConnected, listCollection, accessUser, getCollections } = useContext(NFTContext);

    console.log('liste NFT', listCollection)

    useEffect(() => {
        if (accessUser) {
            getCollections()
        }
    }, [accessUser])

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="40%" maxW="90%"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>

                {!isConnected && (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                )}

                {!nftIsConnected && (
                    <Text> Le contrat n'est pas connecté </Text>
                )}

                {!accessUser && (
                    <Text> Vous n'êtes pas inscrit </Text>
                )}

                {isConnected && nftIsConnected && accessUser && (
                    <Box>
                        <Text>List Collection</Text>

                        <Flex justify="center">
                            {listCollection && listCollection.map((el: any, i) => (
                                <Box key={el.id} minW={"250px"}>
                                    <CardCollection data={el} />
                                </Box>
                            ))}
                        </Flex>

                    </Box>

                )}
            </Box>
        </Flex>
    );
};