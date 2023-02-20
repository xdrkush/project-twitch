import {
    Box,
    Grid,
  } from "@chakra-ui/react"
  
  import { HeroHome } from "../components/HeroHome"
  import { TxEthereum } from "../components/TxEthereum"
  import { KushNFTInfo } from "../components/KushNFTInfo"
  
  export const KushNFTPage = () => (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome />
      </Grid>
      <Grid minH="100vh">
        <KushNFTInfo />
      </Grid>
    </Box>
  )
  