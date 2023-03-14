import { useContext } from 'react';
import { EthersContext } from '../hooks/useEthers';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export const FaucetToken = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected ? (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                ) : (
                    <Flex justifyContent={'space-between'}>
                        <Text>Faucet:</Text>
                        <Button bg="primary.900" minW="50%">Claim</Button>
                    </Flex>
                )}
            </Box>
        </Flex>
    );
};