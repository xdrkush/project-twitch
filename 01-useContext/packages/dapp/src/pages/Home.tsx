import {
    Box,
    Grid,
} from "@chakra-ui/react"

// import { DashboardProfile } from "../components/Dashboard"
import { Hero } from "../components/Hero"
import { TransfertETH } from "../components/TransfertETH"

export const HomePage = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="90vh">
            <Hero />
            {/* <DashboardProfile /> */}
        </Grid>
        <Grid minH="60vh">
            <TransfertETH />
        </Grid>
    </Box>
)