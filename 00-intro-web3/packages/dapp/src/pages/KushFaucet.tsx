import {
    Box,
    Grid,
  } from "@chakra-ui/react"
  
  import { HeroHome } from "../components/HeroHome"
  import { KushFaucetInfo } from "../components/KushFaucet"
  
  export const KushFaucetPage = () => {
  
    return (
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
        <HeroHome title="Faucet" />
        </Grid>
        <Grid minH="100vh">
          <KushFaucetInfo />
        </Grid>
      </Box>
    )
  }