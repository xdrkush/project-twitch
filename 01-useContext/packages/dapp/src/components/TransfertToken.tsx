import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Box, Button, Flex, Text, Input, InputGroup, InputLeftElement, useColorModeValue, useToast } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { TokenContext } from '../providers/tokenProvider';

export const TransfertToken = () => {
    const { isConnected, connectToMetamask, provider, signer } = useContext(EthersContext);
    const { addressSC, balance, totalSupply, name, token } = useContext(TokenContext);
    const [error, setError] = useState('');

    const [addressReciever, setAddressReciever] = useState("")
    const [amount, setAmount] = useState('');
    const [estimateGasPrice, setEstimateGasPrice] = useState('');

    const toast = useToast();

    console.log('token comp', balance)

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

    const sendTransaction = async () => {
        try {
            if (!token || !signer)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const contractWithSigner = token.connect(signer);

            // Bug au niveau proportions dans metamask je sais pas pourqoi à règler
            const total = ethers.utils.parseUnits(amount?.toString(), 18);
            const tx = contractWithSigner.transfer(`${addressReciever?.toString()}`, total);

            console.log('tx', tx)

        } catch (err: any) {
            setError(err.message);
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
                    <Box textAlign="center">
                        <Text>{name}</Text>
                        <Text>{addressSC} </Text>
                        <Text>Total supply: {totalSupply}</Text>

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
                                        onChange={(e) => setAddressReciever(e.target.value)}
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
                                    <Text fontSize='md'>estimate gas: {estimateGasPrice} gwei </Text>
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