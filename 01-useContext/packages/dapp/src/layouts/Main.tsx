import { useEffect } from "react";
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import {
    ChakraProvider, useDisclosure, Grid, GridItem, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';

import { theme } from "../Theme"
import { EthersProvider } from "../providers/ethersProvider";
import { ErrorProvider } from "../providers/errorProvider";

// Components
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
// import { ModalSearch } from "../components/profile/ModalSearch";

export const MainLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [openModal, setOpenModal] = useState(false)
    const location = useLocation();

    // OpenSidebar for frist load (default)
    useEffect(() => onOpen(), [])

    return (
        <ChakraProvider theme={theme}>
            <EthersProvider>
                <ErrorProvider>


                    <Grid
                        templateAreas={`"sidebar nav" "sidebar main"`}
                        gridTemplateRows={'60px 1fr'}
                        gridTemplateColumns={isOpen ? '230px' : '60px' + ' 1fr'}
                        fontWeight='bold'
                    >
                        <GridItem area={'nav'}>
                            {/* <Navbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} openModalSearch={handleOpenModal} /> */}
                            <Navbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                        </GridItem>

                        {/* Auto Open & Close with pointer */}
                        <GridItem area={'sidebar'} onMouseEnter={onOpen} onMouseLeave={onClose}>
                            <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                        </GridItem>

                        {/* <ModalSearch openModal={openModal} handleModal={handleOpenModal} /> */}
                        <GridItem area={'main'}>
                            <Box p="2">
                                <Breadcrumb>
                                    {location.pathname.split('/').map((loc, i) => (
                                        <BreadcrumbItem key={loc + i}>
                                            <BreadcrumbLink
                                                as={NavLink}
                                                to={'/' + location.pathname.split('/').slice(1, i + 1).toString().replaceAll(',', '/')}
                                                end
                                                style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}
                                                _activeLink={{
                                                    color: 'primary.100',
                                                }}
                                            >
                                                {loc}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    ))}
                                </Breadcrumb>
                            </Box>

                            {/* Body / Main */}
                            <Outlet />

                        </GridItem>
                    </Grid>

                </ErrorProvider>
            </EthersProvider>
        </ChakraProvider>
    )
}