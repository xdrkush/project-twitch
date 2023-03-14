import {
    Box,
    Grid,
} from "@chakra-ui/react"
import { Swap } from "../components/Swap"


export const SwapPage = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
            <Swap />
        </Grid>
    </Box>
)