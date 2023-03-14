import { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import {
    ChakraProvider, useDisclosure, Grid, GridItem, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';

import { theme } from "../Theme"
import { EthersProvider } from "../hooks/useEthers";
import { NavLink } from 'react-router-dom';

// Components
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
// import { ModalSearch } from "../components/profile/ModalSearch";

export const MainLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [openModal, setOpenModal] = useState(false)
    const location = useLocation();

    // OpenSidebar for frist load
    useEffect(() => onOpen(), [])

    // const handleOpenModal = () => {
    //     setOpenModal(!openModal ? true : false)
    // }

    // // handle what happens on key press
    // const handleKeyPress = useCallback((event: any) => {
    //     if (event.ctrlKey === true && event.key === ("k" || "K")) {
    //         event.preventDefault();
    //         console.log(`ctrl with K pressed: ${event.key}`);
    //         handleOpenModal();
    //     }
    // }, []);

    // useEffect(() => {
    //     // attach the event listener
    //     document.addEventListener("keydown", handleKeyPress);

    //     // remove the event listener
    //     return () => {
    //         document.removeEventListener("keydown", handleKeyPress);
    //     };
    // }, [handleKeyPress]);

    return (
        <ChakraProvider theme={theme}>
            <EthersProvider>

                <Grid
                    templateAreas={`"nav header" "nav main"`}
                    gridTemplateRows={'60px 1fr'}
                    gridTemplateColumns={isOpen ? '230px' : '60px' + ' 1fr'}
                    h='200px'
                    fontWeight='bold'
                >
                    <GridItem area={'header'}>
                        {/* <Navbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} openModalSearch={handleOpenModal} /> */}
                        <Navbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                    </GridItem>

                    {/* Auto Open & Close with pointer */}
                    <GridItem area={'nav'} minH='100vh' onMouseEnter={onOpen} onMouseLeave={onClose}>
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

            </EthersProvider>
        </ChakraProvider>
    )
}