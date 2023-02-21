import {
  Box,
  Grid,
} from "@chakra-ui/react"

import { HeroHome } from "../components/HeroHome"
import { KushNFTInfo } from "../components/KushNFT"

export const KushNFTPage = () => {

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome title="NFT" />
      </Grid>
      <Grid minH="100vh">
        <KushNFTInfo />
      </Grid>
    </Box>
  )
}