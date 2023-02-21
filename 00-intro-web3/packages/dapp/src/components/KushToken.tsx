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
import { KushABI } from "../config/KushABI"
import { KushFaucetABI } from "../config/KushFaucetABI"
import { config } from '../config';
import { useOutletContext } from "react-router-dom";

export const KushTokenInfo = (props: any) => {
  const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()
  console.log('KushTokenInfo', account)

  const [totalSupply, setTotalSupply] = useState('')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('');
  const [txs, setTxs] = useState([]);

  const KushToken = new ethers.Contract(config.token, KushABI, provider)
  const KushTokenFaucet = new ethers.Contract(config.faucet, KushFaucetABI, provider)
  const token = KushToken.connect(provider)
  const faucet = KushTokenFaucet.connect(provider)

  const startPayment = async ({ setError, handleNewTx, ether, addr }: any) => {
    try {
      if (!window.ethereum)
        throw new Error("NO_ETH_BROWSER_WALLET");

      const contractWithSigner = token.connect(signer);

      // Bug au niveau proportions dans metamask je sais pas pourqoi à règler
      const total = ethers.utils.parseUnits(ether, 18);
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
    console.log('loadContract token info', account)
    // setIsContributor(await faucet.contributors(account) > 0 ? true : false)
    setTotalSupply(`${BigNumber.from(await token.totalSupply())}`)
    setAddress(`${token.address}`)
    setSymbol(`${await token.symbol()}`)
    setName(`${await token.name()}`)
    setBalance(`${await token.balanceOf(signer.getAddress())}`)

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
    <Box>

      {name.length <= 0 && (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Vous n'êtes pas connecter au contrat </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Oops
            </Text>
          </Stack>
        </Stack>
      )}

      {name.length >= 1 && (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Info {name} {symbol} </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              TotalSupply: {(Number(totalSupply) / (10**18) )}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Balance: {Number(balance) / (10**18)}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Address: {address}
            </Text>

          </Stack>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Transfert</Heading>
          </Stack>
          <Box
            rounded={'lg'}
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
      )}
    </Box>
  );
}