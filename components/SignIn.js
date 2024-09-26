import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
export default function SignInPage() {
  return (
    <ChakraProvider>
        <Box textAlign="center" py={10}>
          <Heading>Welcome to Virtual Try On App</Heading>
          <Text mt={6}>Please sign in to continue</Text>
          <Button onClick={() => signIn('google')} mt={4}>Sign in with Google</Button>
        </Box>
      </ChakraProvider>
  )
}
