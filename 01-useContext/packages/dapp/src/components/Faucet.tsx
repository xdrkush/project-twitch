import { useContext } from 'react';
import { EthersContext } from '../providers/ethersProvider';
import { TokenContext } from '../providers/tokenProvider';
import { FaucetContext } from '../providers/faucetProvider';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export const FaucetToken = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { name } = useContext(TokenContext);
    const { addressSC, balance, claimFaucet } = useContext(FaucetContext);

    console.log("faucet comp", name, addressSC, balance)

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected ? (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                ) : (
                    <Box>
                        <Text>Faucet</Text>
                        <Text>
                            {addressSC}
                        </Text>
                        <Text>
                            balance: {balance}
                        </Text>

                        <Flex pt={"5"} justifyContent={'center'}>
                            <Button bg="primary.900" minW="50%" onClick={claimFaucet}>Claim</Button>
                        </Flex>
                    </Box>
                )}
            </Box>
        </Flex>
    );
};