import React from 'react';
import { Box, Image, Spinner, Text, Button, useToast, VStack, HStack, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

export default function TryOnResult({ result, isLoading, history = [] }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate a unique filename
      const date = new Date();
      const timestamp = date.toISOString().replace(/[:.]/g, '-');
      const randomString = Math.random().toString(36).substring(2, 8);
      const filename = `try-on-${timestamp}-${randomString}.png`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast({
        title: 'Download successful',
        description: `Image saved as ${filename}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: 'Download failed',
        description: 'There was an error downloading the image. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>It can take up to 40-50 seconds...</Text>
      </Box>
    );
  }

  if (result) {
    return (
      <VStack spacing={4}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Here is your virtual try-on result:
          </Text>
          <Image 
            src={result}
            alt="Try On Result"
            maxWidth="60%"
            borderRadius="md"
            margin="auto"
            p={2}
          />
          <Button 
            onClick={() => handleDownload(result)} 
            mt={4}
            display="block"
            margin="auto"
          >
            Download Image
          </Button>
        </Box>
        {history.length > 0 && <Button onClick={onOpen}>View History</Button>}

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Try-On History</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                {history.map((item, index) => (
                  <HStack key={index} spacing={4}>
                    <Image src={item.result} alt={`Result ${index + 1}`} boxSize="100px" objectFit="cover" />
                    <VStack align="start">
                      <Text fontWeight="bold">{item.garmentDes}</Text>
                      <Text>Category: {item.category}</Text>
                    </VStack>
                    <Button onClick={() => handleDownload(item.result)}>Download</Button>
                  </HStack>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    );
  }

  return null;
}