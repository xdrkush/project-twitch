import { useContext } from 'react';
import { EthersContext } from '../hooks/useEthers';
import { Box, Button, Text } from '@chakra-ui/react';

export const DashboardProfile = () => {
    const { provider, signer, address, network, isConnected, connectToMetamask } = useContext(EthersContext);

    return (
        <Box>
            {!isConnected ? (
                <Button onClick={connectToMetamask}>Connect with Metamask</Button>
            ) : (
                <Box>
                    <Text>Provider: {provider ? provider.constructor.name : '-'}</Text>
                    <Text>Signer: {signer ? signer.constructor.name : '-'}</Text>
                    <Text>Address: {address || '-'}</Text>
                    <Text>Network: {network ? network.name : '-'}</Text>
                    <Text>Connected: {isConnected ? 'Yes' : 'No'}</Text>
                </Box>
            )}
        </Box>
    );
};