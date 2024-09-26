import React from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'

const PriceWrapper = ({ children }) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  )
}

export default function PricingPage() {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Choose Your Perfect Plan
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Unlock the power of virtual try-ons with our flexible pricing options
        </Text>
      </VStack>
      <Container maxW="container.xl" mt={40}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Free Tier
              </Text>
              <Heading as="h2" fontSize="5xl">
                $0
              </Heading>
              <Text fontSize="3xl" fontWeight="600">
                /month
              </Text>
              <Text color="gray.500">Perfect for getting started</Text>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  10 free try-on sessions per month
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Test extensively before committing
                </ListItem>
              </List>
              <Box w="80%" pt={20}>
              <Button
                  w="full"
                  colorScheme="blue"
                  variant="outline"
                  // Add custom styles using the `style` prop
                  style={{
                    borderRadius: '2xl',
                    fontSize: 'lg',
                    fontWeight: 'bold',
                    px: 10,
                    py: 6,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}
              >
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('blue.300', 'blue.700')}
                  px={4}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                >
                  Most Popular
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Basic Plan
                </Text>
                <Heading as="h2" fontSize="5xl">
                  $2.99
                </Heading>
                <Text fontSize="3xl" fontWeight="600">
                  /month
                </Text>
                <Text color="gray.500">Great for regular users</Text>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    40 try-on sessions per month
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Additional sessions at $0.35 each
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    20% discount on pay-as-you-go rate
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                <Button
                  w="full"
                  colorScheme="blue"
                  // Use Chakra UI's styling props
                  borderRadius="2xl"
                  fontSize="lg"
                  fontWeight="bold"
                  px={10}
                  py={6}
                >
                  Subscribe Now
                </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>

          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Pro Plan
              </Text>
              <Heading as="h2" fontSize="5xl">
                $5.99
              </Heading>
              <Text fontSize="3xl" fontWeight="600">
                /month
              </Text>
              <Text color="gray.500">Ideal for power users</Text>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  80 try-on sessions per month
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Additional sessions at $0.30 each
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  25% discount on pay-as-you-go rate
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
              <Button
                  w="full"
                  colorScheme="blue"
                  variant="outline"
                  // Mix of `style` prop and Chakra UI's styling props
                  style={{
                    borderRadius: '2xl',
                    fontSize: 'lg',
                    fontWeight: 'bold',
                  }}
                  px={10}
                  py={6}
                >
                  Go Pro
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
      </Container>
    </Box>
  )
}