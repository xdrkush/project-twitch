import {
  Box,
  Grid,
} from "@chakra-ui/react"

import { HeroHome } from "../components/HeroHome"
import { TxEthereum } from "../components/TxEthereum"

export const HomePage = () => {

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome title="Home" />
      </Grid>
      <Grid minH="100vh">
        <TxEthereum />
      </Grid>
    </Box>
  )
}