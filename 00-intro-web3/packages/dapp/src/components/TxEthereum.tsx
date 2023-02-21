import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { useOutletContext } from "react-router-dom";

export const TxEthereum = (props: any) => {
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()
    const [error, setError] = useState('');
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState("");
    const [txs, setTxs] = useState([]);

    const startPayment = async ({ setError, handleNewTx, ether, addr }: any) => {
        try {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether)
            });

            const gasPrice = ethers.utils.formatEther(Number(tx.gasPrice))
            const value = ethers.utils.formatEther(tx.value)

            handleNewTx({ hash: tx.hash, gasPrice, value });
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleNewTx = (tx: any) => {
      const updatedTxs: any = [...txs, tx];
      setTxs(updatedTxs);
      localStorage.setItem('txs', JSON.stringify(updatedTxs))
      setBalance(
        // @ts-ignore
        (Number(balance) - tx.gasPrice - tx.value).toString()
      );
    };

    const handleSubmit = async (address: any, amount: any) => {

      await startPayment({
        setError,
        handleNewTx,
        ether: amount?.toString() || '',
        addr: address?.toString() || '',
      });
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Transfert Ethereum</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Enjoy ✌️
                    </Text>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        To: { address }
                    </Text>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Amount: { amount }
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Address ethereum To / Destinataire</FormLabel>
                            <Input type="email" onChange={(e) => setAddress(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Amount / Montant</FormLabel>
                            <Input type="number" onChange={(e) => setAmount(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'primary.500'}
                                color={'white'}
                                onClick={() => handleSubmit(address, amount)}
                                _hover={{
                                    bg: 'primary.900',
                                }}>
                                Transfert
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}