import { Outlet } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from "../Theme"

// Components
import { NavbarMain } from "../components/layouts/NavbarMain"
import { FooterMain } from "../components/layouts/FooterMain"

export const MainLayout = () => {
    function hashHandler() {
        const id = window.location.hash.slice(1) // remove leading '#'
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView()
        }
    }

    window.addEventListener('hashchange', hashHandler, false)

    return (
        <ChakraProvider theme={theme}>
            <NavbarMain />

            <Outlet /> {/* Body  */}

            <FooterMain />
        </ChakraProvider>
    )
}
