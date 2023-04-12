import {
    Box,
    Grid,
} from "@chakra-ui/react"

import { FaucetToken } from "../components/Faucet"
import { TransfertToken } from "../components/TransfertToken"

import { TokenProvider } from '../providers/tokenProvider';
import { FaucetProvider } from '../providers/faucetProvider';

export const TokenPage = () => (
    <Box textAlign="center" fontSize="xl">
        <TokenProvider>
            <Grid minH="100vh">
                
                <TransfertToken />

                <FaucetProvider>
                    <FaucetToken />
                </FaucetProvider>

            </Grid>
        </TokenProvider>
    </Box>
)