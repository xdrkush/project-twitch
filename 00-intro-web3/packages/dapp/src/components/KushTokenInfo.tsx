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

import { ethers, BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { KushABI } from "./KushABI"

export const KushTokenInfo = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('');
  const [txs, setTxs] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  // const signer = provider.getSigner()
  const KushToken = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', KushABI, provider)
  const contract = KushToken.connect(provider)

  console.log('handleNewTx', contract)

  const startPayment = async ({ setError, handleNewTx, ether, addr }: any) => {
    try {
      if (!window.ethereum)
        throw new Error("NO_ETH_BROWSER_WALLET");

      const contractWithSigner = contract.connect(signer);

      // Bug au niveau proportions dans metamask je sais pas pourqoi à règler
      const total = ethers.utils.parseUnits(ether, 0);
      const tx = contractWithSigner.transfer(`${addr}`, total);

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
    // localStorage.setItem('txs', JSON.stringify(updatedTxs))
    setBalance(
      // @ts-ignore
      (Number(balance) - tx.gasPrice - tx.value).toString()
    );
  };

  const loadContract = async () => {
    const accounts = await provider.listAccounts();
    console.log('LoadCOntract', contract, accounts, await contract.balanceOf(accounts[0]))
    setTotalSupply(`${BigNumber.from(await contract.totalSupply())}`)
    setAddress(`${contract.address}`)
    setSymbol(`${await contract.symbol()}`)
    setName(`${await contract.name()}`)
    setBalance(`${await contract.balanceOf(signer.getAddress())}`)
  }

  const sendTx = async () => {
    console.log('sendTx', amount, address)

    await startPayment({
      setError,
      handleNewTx,
      ether: amount?.toString() || '',
      addr: addressTo?.toString() || '',
    });
  };


  useEffect(() => {
    if (!window.ethereum)
      return
    loadContract()
  }, [])

  // console.log('KushToken', provider, KushToken, totalSupply)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Info {name} {symbol} </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            TotalSupply: {totalSupply}
          </Text>
          <Text fontSize={'lg'} color={'gray.600'}>
            Balance: {balance}
          </Text>
          <Text fontSize={'lg'} color={'gray.600'}>
            Address: {address}
          </Text>
        </Stack>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Transfert ({name})</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Enjoy ✌️
          </Text>
          <Text fontSize={'lg'} color={'gray.600'}>
            To: { addressTo }
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
              <Input type="email" onChange={(e) => setAddressTo(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Amount / Montant</FormLabel>
              <Input type="number" onChange={(e) => setAmount(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'primary.500'}
                color={'white'}
                onClick={sendTx}
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