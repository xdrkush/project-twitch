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

export const KushTokenInfo = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [address, setAddress] = useState('')
  const [addressFaucet, setAddressFaucet] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [addressTo, setAddressTo] = useState('')
  const [account, setAccount] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountDeposit, setAmountDeposit] = useState('')
  const [balance, setBalance] = useState('')
  const [balanceFaucet, setBalanceFaucet] = useState('')
  const [error, setError] = useState('');
  const [isContributor, setIsContributor] = useState(false);
  const [addressAllowance, setAddressToAllowance] = useState(''); // input

  const [txs, setTxs] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner();
  const KushToken = new ethers.Contract(config.token, KushABI, provider)
  const KushTokenFaucet = new ethers.Contract(config.faucet, KushFaucetABI, provider)
  const contract = KushToken.connect(provider)
  const contractFaucet = KushTokenFaucet.connect(provider)

  console.log('handleNewTx', contract)

  const startPayment = async ({ setError, handleNewTx, ether, addr }: any) => {
    try {
      if (!window.ethereum)
        throw new Error("NO_ETH_BROWSER_WALLET");

      const contractWithSigner = contract.connect(signer);

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
    const [account] = await provider.listAccounts();

    setIsOwner(await contract.owner() === account ? true : false)
    setIsContributor(await contractFaucet.contributors(account) > 0 ? true : false)
    setTotalSupply(`${BigNumber.from(await contract.totalSupply())}`)
    setAddress(`${contract.address}`)
    setAddressFaucet(`${contractFaucet.address}`)
    setSymbol(`${await contract.symbol()}`)
    setName(`${await contract.name()}`)
    setAccount(account)
    setBalance(`${await contract.balanceOf(signer.getAddress())}`)
    setBalanceFaucet(`${await contract.balanceOf(contractFaucet.address)}`)
    console.log('owner 999', await contract.owner(), account, isOwner)

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

  const claimFaucet = async () => {
    try {

      if (!window.ethereum)
        throw new Error("NO_ETH_BROWSER_WALLET");

      const contractFaucetWithSigner = contractFaucet.connect(signer);
      await contractFaucetWithSigner.claim();

    } catch (error) {
      console.log(error)
    }
  }

  const authAllowance = async () => {
    try {
      console.log('authAllowance', account, addressAllowance)
      await contract.allowance(account, addressAllowance)
    } catch (error) {
      console.log(error)
    }
  }

  const authApprove = async () => {
    try {
      console.log('authAllowance', addressAllowance)
      const contractWithSigner = contract.connect(signer);
      await contractWithSigner.approve(addressAllowance, "1000000000000000000000000")
    } catch (error) {
      console.log(error)
    }
  }

  const depositToFaucet = async () => {
    const total = ethers.utils.parseUnits(amountDeposit, 18);

    try {
      console.log('depositToFaucet', total)
      // await contract.allowance(contract.address, account)
  
      const contractWithSigner = contract.connect(signer);
      // await contractWithSigner.approve(account, total)
      await contractWithSigner.deposit(total)
    } catch (error) {
      console.log(error)
    }
  }

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
              TotalSupply: {totalSupply}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Balance: {balance}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Address: {address}
            </Text>

            {isOwner === true && (
              <>

                <FormControl>
                  <FormLabel>Authorise address to Allowance</FormLabel>
                  <Input type="text" onChange={(e) => setAddressToAllowance(e.target.value)} />
                </FormControl>
                <Button
                  bg={'primary.500'}
                  color={'white'}
                  onClick={authAllowance}
                  _hover={{
                    bg: 'primary.900',
                  }}>
                  Authorize Allowance
                </Button>
                <Button
                  bg={'primary.500'}
                  color={'white'}
                  onClick={authApprove}
                  _hover={{
                    bg: 'primary.900',
                  }}>
                  Approve
                </Button>
              </>
            )}


          </Stack>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Transfert ({name})</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Enjoy ✌️
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              From(account): {account} {isContributor && ( <> isContributor </> )}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              To: {addressTo}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Amount: {amount}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              BalanceFaucet: {balanceFaucet}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}>
              Address (faucet): {addressFaucet}
            </Text>
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
                <FormControl id="password">
                  <FormLabel>DEPOSIT TO FAUCET Amount / Montant (en Token)</FormLabel>
                  <Input type="number" onChange={(e) => setAmountDeposit(e.target.value)} />
                </FormControl>
                <Button
                  bg={'primary.500'}
                  color={'white'}
                  onClick={depositToFaucet}
                  _hover={{
                    bg: 'primary.900',
                  }}>
                  DEPOSIT
                </Button>
                <Button
                  bg={'primary.500'}
                  color={'white'}
                  onClick={claimFaucet}
                  _hover={{
                    bg: 'primary.900',
                  }}>
                  claim token
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      )}
    </Flex>
  );
}