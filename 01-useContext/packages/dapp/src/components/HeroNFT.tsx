import { useContext } from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { EthersContext } from '../providers/ethersProvider';
import { NFTContext } from '../providers/nftProvider';

export const HeroNFT = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);
    const { addressNFT, totalSupplyNFTs, totalSupplyCollections, totalSupplyConsumers, totalSupplyCertifs, name, symbol, nftIsConnected, registerAccount, accessUser, isOwner } = useContext(NFTContext);

    console.log('hero NFT')

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected || !nftIsConnected ? (
                    <>
                        {!isConnected && (
                            <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                        )}

                        {!nftIsConnected && (
                            <Text> Le contrat n'est pas connecté </Text>
                        )}

                    </>
                ) : (
                    <Box textAlign="center">
                        <Box pb="2">
                            <Text>{name} : {symbol}</Text>
                            <Text>{addressNFT}</Text>
                        </Box>

                        <Box pb="2">
                            <Text>Supply NFT : {String(totalSupplyNFTs)}</Text>
                            <Text>Supply Collections : {String(totalSupplyCollections)}</Text>
                            <Text>Supply Consumers : {String(totalSupplyConsumers)}</Text>
                            <Text>Supply Certifs : {String(totalSupplyCertifs)}</Text>
                            <Text>isAuthorizedAccess: {String(accessUser)}</Text>
                            <Text>isOwner: {String(isOwner)}</Text>
                        </Box>

                        <Box pb="2">
                            <Text fontSize={'lg'} color={'gray.600'}>
                                unicorn: https://www.zupimages.net/up/23/08/tus4.jpeg
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                html: https://www.zupimages.net/up/23/08/rt0i.png
                            </Text>
                            <Text fontSize={'lg'} color={'gray.600'}>
                                css: https://www.zupimages.net/up/23/08/dise.png
                            </Text>
                        </Box>

                        {!accessUser && (
                            <Button
                                mt="5"
                                bg={'primary.500'}
                                color={'white'}
                                onClick={registerAccount}
                                _hover={{
                                    bg: 'primary.900',
                                }}>
                                S'inscrire
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    );
};