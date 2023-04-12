import { useEffect, useState } from 'react';
import { Box, Flex, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { Collection } from "../types.d"

export const CardCollection = (props: any) => {
    const [collection, setCollection] = useState<Collection>()
    console.log('CardCollection 1', props)

    useEffect(() => {
        const { id, title, uriIMG, price, author, totalConsumers, totalSupply } = props.data;
        setCollection({ id: Number(id), title, uriIMG, price, author, totalConsumers, totalSupply })
        console.log('CardCollection 2', Number(id), title, collection)

    }, [])

    return (
        <Box p='4' w="full">
            {collection && (
                <Link
                    p={2}
                    href={`#/collection/${collection.id}`}
                    fontSize={'md'}
                    fontWeight={500}
                    _hover={{ textDecoration: 'none' }}
                    color={'primary'}>
                    <Flex
                        position="relative"
                        minH="250px"
                        borderRadius="7"
                        backgroundImage={
                            `url(${collection.uriIMG})`
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
                                        {collection.id} :: {collection.title}
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