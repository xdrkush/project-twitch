import {
  Box,
  Grid,
} from "@chakra-ui/react"

import { HeroHome } from "../components/HeroHome"

export const KushCollectionPage = () => {

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome title="Collection" />
      </Grid>
    </Box>
  )
}
