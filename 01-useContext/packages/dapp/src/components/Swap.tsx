import { useContext } from 'react';
import { EthersContext } from '../hooks/useEthers';
import { Box, Button, Flex, Text, Input, Select, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';

export const Swap = () => {
    const { isConnected, connectToMetamask } = useContext(EthersContext);

    return (
        <Flex align={'center'} justify={'center'}>
            <Box borderRadius={"xl"} backgroundColor={useColorModeValue('gray.100', 'darkness.900')} p="6"
                borderX={'1px'} borderY={'1px'} minW="370px" w="40%" maxW="620px"
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}>
                {!isConnected ? (
                    <Button onClick={connectToMetamask}>Connect with Metamask</Button>
                ) : (
                    <Box textAlign="left">
                        <Text>Échanger:</Text>

                        <Flex my='4'>
                            <Box w={"70%"}>
                                <InputGroup size="lg" >
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='$'

                                    />
                                    <Input focusBorderColor='primary.100' borderRadius="full" type='number' placeholder='12.000000' />
                                </InputGroup>

                                <Text ml="3">12.0002</Text>
                            </Box>

                            <Box w={"30%"} ml={'2'}>
                                <InputGroup size="lg" >
                                    <Select focusBorderColor='primary.100' size="lg" borderRadius="full" placeholder='Select devise'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </InputGroup>

                                <Text ml="3">solde: </Text>
                            </Box>

                        </Flex>

                        <Flex my='4'>
                            <Box w={"70%"}>
                                <InputGroup size="lg" >
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='$'

                                    />
                                    <Input focusBorderColor='primary.100' borderRadius="full" type='number' placeholder='12.000000' />
                                </InputGroup>
                            </Box>

                            <Box w={"30%"} ml={'2'}>
                                <InputGroup size="lg" >
                                    <Select focusBorderColor='primary.100' size="lg" borderRadius="full" placeholder='Select devise'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </InputGroup>

                                <Text ml="3">solde: </Text>
                            </Box>

                        </Flex>

                        <Button bg="primary.900" minW="50%">Échanger</Button>

                    </Box>
                )}
            </Box>
        </Flex>
    );
};