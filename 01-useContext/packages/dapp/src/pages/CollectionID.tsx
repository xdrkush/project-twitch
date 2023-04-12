import {
    Box,
    Grid,
} from "@chakra-ui/react"

import { TokenProvider } from '../providers/tokenProvider';
import { NFTProvider } from '../providers/nftProvider';

import { HeroCollection } from "../components/HeroCollection"
import { ListCourInCollection } from "../components/ListCourInCollection"

export const CollectionID = () => (
    <Box textAlign="center" fontSize="xl">
        <TokenProvider>
            <NFTProvider>
                <Grid minH="50vh">
                    <HeroCollection />
                </Grid>
                <Grid minH="50vh">
                    <ListCourInCollection />
                </Grid>
            </NFTProvider>
        </TokenProvider>
    </Box>
)