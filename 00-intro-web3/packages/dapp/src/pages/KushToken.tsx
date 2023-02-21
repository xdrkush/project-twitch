import {
  Box,
  Grid,
} from "@chakra-ui/react"

import { HeroHome } from "../components/HeroHome"
import { KushTokenInfo } from "../components/KushToken"

export const KushTokenPage = () => {


  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome title="Token" />
      </Grid>
      <Grid minH="100vh">
        <KushTokenInfo />
      </Grid>
    </Box>
  )
}
