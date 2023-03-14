import {
    Box,
    Grid,
} from "@chakra-ui/react"

import { FaucetToken } from "../components/Faucet"
import { TransfertToken } from "../components/TransfertToken"

export const TokenPage = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
            <TransfertToken />
            <FaucetToken />
        </Grid>
    </Box>
)