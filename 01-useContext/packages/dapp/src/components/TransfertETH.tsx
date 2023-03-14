import { useContext, useState, useEffect } from 'react';
import { ethers } from "ethers";
import { EthersContext } from '../hooks/useEthers';
import { Box, Button, Flex, Text, Input, Select, InputGroup, InputLeftElement, useColorModeValue, useToast } from '@chakra-ui/react';

export const TransfertETH = () => {
    const { signer, isConnected, balance, connectToMetamask, provider } = useContext(EthersContext);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [estimateGasPrice, setEstimateGasPrice] = useState('');

    const toast = useToast()

    useEffect(() => {
        if (error)
            toast({
                title: 'Une erreur est survenue !',
                description: error,
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            })
    }, [error])

    const startPayment = async ({ ether, addr }: any) => {
        try {
            if (!window.ethereum || !signer)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether)
            });

            const gasPrice = ethers.utils.formatEther(Number(tx.gasPrice))
            const value = ethers.utils.formatEther(tx.value)

            console.log('tx', tx, gasPrice, value)
        } catch (err: any) {
            setError(err.message);
        }
    };

    const sendTransaction = async () => {
        try {
            await startPayment({
                ether: amount?.toString() || '',
                addr: address?.toString() || '',
            });

        } catch (err: any) {
            console.log('err', err)
            setError(err.message)
        }
    };

    const handleAmount = async (e: any) => {
        if (!provider)
            throw new Error("NO_ADDRESS");

        setAmount(e.target.value);
        setEstimateGasPrice(ethers.utils.formatUnits(await provider.getGasPrice(), "gwei"))

    }

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected ? (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                ) : (
                    <Box textAlign="left">
                        <Text>Transfert (eth):</Text>

                        <Text fontSize='md'>Your balance: {balance} </Text>

                        <Flex my='4'>
                            <Box w={"full"}>
                                <InputGroup size="lg" >
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='$'

                                    />
                                    <Input
                                        onChange={(e) => setAddress(e.target.value)}
                                        focusBorderColor='primary.100' borderRadius="full" type='text' placeholder='0x...'
                                    />
                                </InputGroup>

                            </Box>

                        </Flex>

                        <Flex my='4'>
                            <Box w={"full"}>
                                <InputGroup size="lg" >
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='$'

                                    />
                                    <Input
                                        onChange={(e) => handleAmount(e)}
                                        focusBorderColor='primary.100' borderRadius="full" type='number' placeholder='12.000000'
                                    />
                                </InputGroup>
                                {estimateGasPrice && (
                                    <Text fontSize='md'>est gasPrice: {estimateGasPrice} gwei </Text>
                                )}

                            </Box>

                        </Flex>

                        <Button bg="primary.900" minW="50%" onClick={sendTransaction}>Échanger</Button>

                    </Box>
                )}
            </Box>
        </Flex>
    );
};