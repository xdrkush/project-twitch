import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

export const theme = extendTheme({

    initialColorMode: 'system',
    useSystemColorMode: true,
    fontSizes: {
        // xs: '7px',
        // sm: '11px',
        // md: '14px',
        // lg: '18px',
        // xl: '32px',
        // xxl: '45px',
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.800')(props),
                bg: mode('white', 'gray.800')(props),
                lineHeight: 'base',
            },
        }),
    },
    colors: {
        primary: {
            50: '#1E998C',
            100: "#1E998C",
            500: '#1E998C',
            800: '#1E998C',
            900: '#1E998C ',
        },
        secondary: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        darkness: {
            50: '#C4C4C4',
            500: '#383D46',
            900: '#171923',
        },
        light: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        accent: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        success: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        warning: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        danger: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        },
        custom: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        }
    },
    components: {
        Drawer: {
            parts: ['dialog', 'header', 'body'],
            variants: {
                secondary: {
                    dialog: {
                        maxW: "68px",
                        borderRight: "1px",
                        borderRightColor: 'gray.100'
                    },
                    header: {
                        maxW: "220px",

                    },
                    body: {
                        maxW: "68px",
                    }
                }
            },
        },
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },
                // 4. We can override existing variants
                solid: (props: StyleFunctionProps) => ({
                    bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                }),
                // 5. We can add responsive variants
                sm: {
                    bg: 'teal.500',
                    fontSize: 'md',
                },
            },
            // 6. We can overwrite defaultProps
            defaultProps: {
                size: 'md', // default is md
                variant: 'sm', // default is solid
                colorScheme: 'green', // default is gray
            },
        },
    },
})