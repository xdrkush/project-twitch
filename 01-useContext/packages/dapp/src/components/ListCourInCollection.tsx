import { useContext, useEffect } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';
import { CardCour } from './CardCour'
import { useParams } from 'react-router-dom';

export const ListCourInCollection = () => {
    const { id } = useParams();
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { nftIsConnected, coursInCollection, accessUser, getCoursInCollection } = useContext(NFTContext);

    console.log('liste cours in collection', coursInCollection)

    useEffect(() => {
        if (accessUser && id) {
            getCoursInCollection(id)
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
                        <Text>List Cours in Collection</Text>

                        <Flex>
                            {coursInCollection && coursInCollection.map((el, i) => {
                                return (
                                    <CardCour key={i} data={el} />
                                )
                            })}
                        </Flex>

                    </Box>

                )}
            </Box>
        </Flex>
    );
};