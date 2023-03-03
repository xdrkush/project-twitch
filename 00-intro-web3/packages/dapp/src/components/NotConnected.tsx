import { Heading, Stack, Text } from "@chakra-ui/layout"


export const NotConnected = (props: any) => {
    return (
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>{props.text} </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Oops
                </Text>
            </Stack>
        </Stack>
    )
}