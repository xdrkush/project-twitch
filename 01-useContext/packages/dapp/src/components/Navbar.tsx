import { useContext } from "react";
import {
    Box,
    Flex,
    Button,
    Stack,
    Link,
    Text,
    useColorModeValue,
    Menu, MenuItem, MenuButton, MenuList, MenuDivider,
    Center, Avatar, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from "./ColorSwitcher";
import { EthersContext } from "../hooks/useEthers";

export function Navbar({ isOpen, onOpen, onClose, openModalSearch }: any) {
    const { isConnected, connectToMetamask, address, balance } = useContext(EthersContext);

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.100', 'primary.100')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex' }}>
                    <Button borderRadius='5% 0 0 5%' onClick={openModalSearch}>CTRL+K</Button>
                    <InputGroup w="30%" >
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input focusBorderColor='primary.100' borderRadius='0' type='number' placeholder='Search: '
                            onClick={openModalSearch} />
                    </InputGroup>
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link
                        href={'#/home'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontSize={'lg'}
                        _hover={{
                            textDecoration: 'none',
                            color: useColorModeValue('gray.800', 'white'),
                        }}>
                        Dr Kush
                    </Link>
                </Flex>

                <Box>
                    <Text>Addr: {address} </Text>
                    <Text>balance: {balance} </Text>
                </Box>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <ColorModeSwitcher justifySelf="flex-end" />

                    {isConnected ? (

                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                />
                            </MenuButton>
                            <MenuList alignItems={'center'}>
                                <br />
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </Center>
                                <br />
                                <Center>
                                    <p>Username</p>
                                </Center>
                                <br />
                                <MenuDivider />
                                <MenuItem>Your Servers</MenuItem>
                                <MenuItem>Account Settings</MenuItem>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button onClick={connectToMetamask}>Connect Wallet</Button>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
}
