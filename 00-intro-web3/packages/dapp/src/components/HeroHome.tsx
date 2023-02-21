import {
    Flex,
    VStack,
    Stack,
    Text,
    Button,
    useBreakpointValue,
} from '@chakra-ui/react';

export const HeroHome = (props: any) => {
    const { title } = props;
    return (
        <Flex
            w={'full'}
            h={'80vh'}
            backgroundImage={
                'url(https://i.pinimg.com/originals/9e/0e/dc/9e0edc3bf5589b737487f5680e2e9a46.gif)'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6} >
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        Welcome to H-Land
                    </Text>
                    <Text
                        color={'white'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}>
                        { title }
                    </Text>
                    <Stack direction={'row'} justify={'center'} w={'full'}>
                        <Button
                            bg={'primary.500'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'whiteAlpha.500' }}>
                            Get Started
                        </Button>
                        <Button
                            bg={'secondary.500'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'whiteAlpha.500' }}>
                            Show me more
                        </Button>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    );
}
