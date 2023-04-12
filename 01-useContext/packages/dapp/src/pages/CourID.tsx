import {
    Box,
    Grid,
} from "@chakra-ui/react"

import { TokenProvider } from '../providers/tokenProvider';
import { NFTProvider } from '../providers/nftProvider';
import { HeroCour } from "../components/HeroCour";

export const CourID = () => (
    <Box textAlign="center" fontSize="xl">
        <TokenProvider>
            <NFTProvider>
                <Grid minH="50vh">
                    <HeroCour />
                </Grid>
            </NFTProvider>
        </TokenProvider>
    </Box>
)