import {
    Box,
    Grid,
} from "@chakra-ui/react"

import { Hero } from "../components/Hero"

export const NFTPage = () => (
    <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
            <Hero />
        </Grid>
    </Box>
)