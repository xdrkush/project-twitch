import { useContext, useEffect, useState } from 'react';
import { EthersContext } from '../hooks/useEthers';
import { ethers, BigNumber } from 'ethers';
import { config } from "../config";
import { Box, Button, Flex, Text, Input, InputGroup, InputLeftElement, useColorModeValue, useToast } from '@chakra-ui/react';

import { KushABI } from "../config/KushABI"
import { KushFaucetABI } from "../config/KushFaucetABI"

export const TransfertToken = () => {
    const { isConnected, connectToMetamask, provider, signer } = useContext(EthersContext);
    const [totalSupply, setTotalSupply] = useState("")
    const [addressContract, setAddressContract] = useState("")
    const [symbol, setSymbol] = useState("")
    const [name, setName] = useState("")
    const [balance, setBalance] = useState("")
    const [error, setError] = useState('');

    const [addressReciever, setAddressReciever] = useState("")
    const [amount, setAmount] = useState('');
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

    console.log('provider TOKEN', provider, config)
    const loadContract = async () => {
        if (!provider || !signer)
            return
        // throw new Error("NO_PROVIDER");

        // console.log(await provider.getGasPrice())
        const KushToken = new ethers.Contract(config.token, KushABI, provider)
        // const KushTokenFaucet = new ethers.Contract(config.faucet, KushFaucetABI, provider)
        const token = KushToken.connect(provider)
        // const faucet = KushTokenFaucet.connect(provider)

        console.log(token.address, await token.symbol())

        setTotalSupply(`${BigNumber.from(await token.totalSupply())}`)
        setAddressContract(`${token.address}`)
        setSymbol(`${await token.symbol()}`)
        setName(`${await token.name()}`)
        setBalance(`${ethers.utils.formatEther(await token.balanceOf(signer.getAddress()))}`)

        // console.log('loadContract Token', token, faucet, name)

    }

    useEffect(() => {
        loadContract()
    }, [])

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
                addr: addressReciever?.toString() || '',
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
                        <Text>Transfert ({name}):</Text>

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

                                {/* {estimateGasPrice && (
                                    <Text fontSize='md'>est gasPrice: {estimateGasPrice} gwei </Text>
                                )} */}

                            </Box>

                        </Flex>

                        <Button bg="primary.900" minW="50%" onClick={sendTransaction}>Échanger</Button>

                    </Box>
                )}
            </Box>
        </Flex>
    );
};