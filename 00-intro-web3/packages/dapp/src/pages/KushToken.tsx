import {
    Box,
    Grid,
  } from "@chakra-ui/react"
  
  import { HeroHome } from "../components/HeroHome"
  import { KushTokenInfo } from "../components/KushTokenInfo"
  
  export const KushTokenPage = () => (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh">
        <HeroHome />
      </Grid>
      <Grid minH="100vh">
        <KushTokenInfo />
      </Grid>
    </Box>
  )
  