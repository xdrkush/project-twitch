import { useContext, useEffect } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';
import { useParams } from 'react-router-dom';

export const HeroCour = () => {
    const { id } = useParams();
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { nftIsConnected, accessUser, getCourInfo, courInfo, registerToCour } = useContext(NFTContext);

    console.log('hero Cour', courInfo)

    useEffect(() => {
        if (accessUser && id) {
            getCourInfo(id)
        }
    }, [accessUser])

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected || !nftIsConnected || !courInfo ? (
                    <Button
                        bg={'primary.500'}
                        color={'white'}
                        onClick={() => registerToCour(id)}
                        _hover={{
                            bg: 'primary.900',
                        }}>
                        S'inscrire au cour {id}
                    </Button>
                ) : (
                    <Box textAlign="center">

                        <Box pb="2">
                            <Text>{id} : {courInfo.title}</Text>
                            <Text>{courInfo.author}</Text>
                            <Text>Collection: {Number(courInfo.collection_id)}</Text>
                            <Text>Cour n°: {Number(courInfo.position)}</Text>
                        </Box>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};