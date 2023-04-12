import { useEffect, useState } from 'react';
import { Box, Flex, Link, Stack, Text, VStack } from '@chakra-ui/react';

interface Cour {
    id: any;
    title: any;
    uriIMG: any;
    author: any;
    collection_id: any;
    position: any;
}

export const CardCour = (props: any) => {
    const [cour, setCour] = useState<Cour>()
    console.log('CardCour 1', props.data)

    useEffect(() => {
        const { id, title, uriIMG, author, collection_id, position } = props.data;
        setCour({ id: Number(id), title, uriIMG, author, collection_id, position })
        console.log('CardCour 2', Number(id), title, cour)

    }, [])

    return (
        <Box p='4' w="full">
            {cour && (
                <Link
                    p={2}
                    href={`#/cour/${cour.id}`}
                    fontSize={'md'}
                    fontWeight={500}
                    _hover={{ textDecoration: 'none' }}
                    color={'primary'}>
                    <Flex
                        position="relative"
                        minH="250px"
                        borderRadius="7"
                        backgroundImage={
                            `url(${cour.uriIMG})`
                        }
                        backgroundSize={'cover'}
                        backgroundPosition={'center center'}>
                        <VStack
                            borderRadius="7"
                            justify={'center'}
                            bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>

                            <Stack maxW={'2xl'} align={'flex-start'} spacing={6} p="3">
                                <Box textAlign="left">
                                    <Text
                                        color={'white'}
                                        fontWeight={700}
                                        lineHeight={1.2}
                                        fontSize={'xl'}>
                                        {cour.id} :: {cour.title}
                                    </Text>
                                </Box>
                            </Stack>
                        </VStack>
                    </Flex>
                </Link>
            )}
        </Box>
    );
};