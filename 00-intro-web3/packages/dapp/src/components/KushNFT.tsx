import { Box, Text } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom";

export const KushNFTInfo = (props: any) => {
    const { provider, siteConnected, isOwner, account, signer }: any = useOutletContext()
    console.log('KushNFTInfo', account)
    
    return (
        <Box>
            <Text> Info NFT </Text>
        </Box>
    )
}