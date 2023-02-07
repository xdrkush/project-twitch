import { useEffect, useState } from 'react';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { ethers } from 'ethers';
import { Web3Provider } from "@ethersproject/providers"
// import { Provider } from '../../types';

console.log('ethers', ethers)

export function NavbarMain() {
    // const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const { isOpen, onToggle } = useDisclosure();
    // let provider: Provider;

    const [error, setError] = useState('');
    const [siteConnected, setSiteConnected] = useState(false);
    const [balance, setBalance] = useState("");

    // const handleNewTx = (tx: Transaction) => {
    //   const updatedTxs: Transaction[] = [...txs, tx];
    //   setTxs(updatedTxs);
    //   localStorage.setItem('txs', JSON.stringify(updatedTxs))
    //   setBalance(
    //     // @ts-ignore
    //     (Number(balance) - tx.gasPrice - tx.value).toString()
    //   );
    // };

    // const handleSubmit = async (e: any) => {
    //   e.preventDefault();
    //   const data = new FormData(e.target);
    //   if (error) setError('');
    //   await startPayment({
    //     setError,
    //     handleNewTx,
    //     ether: data.get("ether")?.toString() || '',
    //     addr: data.get("addr")?.toString() || '',
    //   });
    // };

    const handleInitialConnection = async (account: string) => {
        setSiteConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        const formattedBalance = ethers.utils.formatEther(balance);
        if (formattedBalance) setBalance(formattedBalance.toString());
    };

    useEffect(() => {
        const isBrowserWalletConnected = async () => {
            if (!window.ethereum)
                throw new Error("NO_ETH_BROWSER_WALLET");

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts?.length > 0) {
                const account = accounts[0];
                await handleInitialConnection(account);
                setAddress(account)
            }

        }
        try {
            isBrowserWalletConnected();
        } catch (err: any) {
            setError(err.message);
        }
    }, []);

    async function handleBtnConnectSiteClick() {
        try {
          if (!window.ethereum)
            throw new Error("NO_ETH_BROWSER_WALLET"); 
    
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            if (account) {
              await handleInitialConnection(account);
            } else {
              throw new Error("FAILED_TO_CONNECT");
            }
    
        } catch (err: any) {
          setError(err.message);
        }
      }

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
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
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

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>

                    <Box>
                        <Box><Text>balance: {balance}</Text></Box>
                        <Box><Text>{address}</Text></Box>
                    </Box>

                    <ColorModeSwitcher justifySelf="flex-end" />

                    <Button
                        display={'inline-flex'}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'primary.500'}
                        onClick={handleBtnConnectSiteClick}
                        _hover={{
                            bg: 'primary.500',
                        }}>
                        Connect Wallet
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>

            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'md'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('primary.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'primary.500' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'primary.500'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Acceuil',
        href: '#/',
    },
];