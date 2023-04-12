import { Box, Flex, Grid, } from "@chakra-ui/react"

// Provider
import { TokenProvider } from '../providers/tokenProvider';
import { NFTProvider } from '../providers/nftProvider';

import { HeroNFT } from "../components/HeroNFT"
import { CreateNFT } from "../components/CreateNFT"
import { CreateCollection } from "../components/CreateCollection"
import { ListCollection } from "../components/ListCollection"

export const NFTPage = () => (
    <Box textAlign="center" fontSize="xl">
        <TokenProvider>
            <NFTProvider>

                <Grid py="5" minH="50vh">
                    <HeroNFT />

                </Grid>

                <Grid py="5" minH="50vh">
                    <Flex justifyContent="space-around">
                        <CreateCollection />
                        <CreateNFT />

                    </Flex>
                </Grid>

                <Grid py="5" minH="50vh">
                    <ListCollection />
                </Grid>

            </NFTProvider>
        </TokenProvider>
    </Box>
)