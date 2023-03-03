import { ethers } from 'ethers';
import { KushABI } from "../config/KushABI"
import { KushFaucetABI } from "../config/KushFaucetABI"
import { config } from '../config';
import { useEffect, useState } from 'react';

import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom"
import { NotConnected } from './NotConnected';

export const KushFaucetInfo = () => {
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()
    console.log('KushFaucetInfo', account)

    const [amountDeposit, setAmountDeposit] = useState('')
    const [addressAllowance, setAddressToAllowance] = useState('');
    const [addressFaucet, setAddressFaucet] = useState('')
    const [balanceFaucet, setBalanceFaucet] = useState('')
    const [isContributor, setIsContributor] = useState(false);

    const KushToken = new ethers.Contract(config.token, KushABI, provider)
    const KushTokenFaucet = new ethers.Contract(config.faucet, KushFaucetABI, provider)
    const token = KushToken.connect(provider)
    const faucet = KushTokenFaucet.connect(provider)

    const loadContract = async () => {
        console.log('loadContract faucet info', account, faucet.address)
        setIsContributor(await faucet.contributors(account) > 0 ? true : false)
        setAddressFaucet(`${faucet.address}`)
        setBalanceFaucet(await token.balanceOf(faucet.address))
    }

    useEffect(() => {
        if (!window.ethereum)
            return
        loadContract()
    }, [])

    const authAllowance = async () => {
        try {
            console.log('authAllowance', account, addressAllowance)
            await token.allowance(account, addressAllowance)
        } catch (error) {
            console.log(error)
        }
    }

    const authApprove = async () => {
        try {
            console.log('authAllowance', addressAllowance)
            const contractWithSigner = token.connect(signer);
            await contractWithSigner.approve(addressAllowance, "1000000000000000000000000")
        } catch (error) {
            console.log(error)
        }
    }

    const depositToFaucet = async () => {
        const total = ethers.utils.parseUnits(amountDeposit, 18);

        try {
            console.log('depositToFaucet', total)
            await token.allowance(account, faucet.address)

            const tokenWithSigner = token.connect(signer);
            await tokenWithSigner.approve(faucet.address, total)

            await faucet.connect(signer).deposit(total)
        } catch (error) {
            console.log(error)
        }
    }


    const claimFaucet = async () => {
        try {

            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const faucetWithSigner = faucet.connect(signer);
            await faucetWithSigner.claim();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            {siteConnected ? (
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

                    <Text> Info Faucet </Text>
                    <Box
                        rounded={'lg'}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <Stack spacing={10}>

                                <Text fontSize={'lg'} color={'gray.600'}>
                                    BalanceFaucet: {Number(balanceFaucet) / (10 ** 18)}
                                </Text>
                                <Text fontSize={'lg'} color={'gray.600'}>
                                    Address (faucet): {addressFaucet}
                                </Text>

                                {isOwner === true && (
                                    <Box>

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
                                    </Box>
                                )}

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
                </Stack>) : (
                <NotConnected text="Vous n'êtes pas connecté à metamask, ou au contrat au du token ou du faucet." />
            )}
        </Box>
    )
}
