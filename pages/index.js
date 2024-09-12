// pages/index.js
import { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Alert, AlertIcon, Code, Input, useToast } from '@chakra-ui/react';
import ImageUpload from '../components/ImageUpload';
import GarmentDescription from '../components/GarmentDescription';
import TryOnResult from '../components/TryOnResult';
import ReplicateTokenInput from '../components/ReplicateTokenInput';
import Examples from '@/components/Examples';

export default function Home() {
  const [garmImg, setGarmImg] = useState(null);
  const [humanImg, setHumanImg] = useState(null);
  const [garmentDes, setGarmentDes] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [replicateToken, setReplicateToken] = useState('');

  const toast = useToast(); // Initialize the toast variable

  const handleTryOn = async () => {
    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('garm_img', garmImg);
    formData.append('human_img', humanImg);
    formData.append('garment_des', garmentDes);
    formData.append('replicate_token', replicateToken);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred');
        }
        setResult(data.result);
        // Display success toast
        toast({
          title: 'Virtual try-on successful',
          description: 'The virtual try-on result has been received.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setError('');
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Received non-JSON response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}. Please check the console for more details.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding={8}>
        <VStack spacing={8}>
          <Heading>Virtual Try On App</Heading>
          <Text>Upload a garment image and a human image, then describe the garment to see how it looks!</Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <VStack align="start">
                <Text>{error}</Text>
                <Code>Please check the browser console for more details.</Code>
              </VStack>
            </Alert>
          )}
          {/* {result && (
            <Alert status="success">
              <AlertIcon />
              <VStack align="start">
                <Text>Virtual try-on result received successfully!</Text>
              </VStack>
            </Alert>
          )} */}
          <ReplicateTokenInput token={replicateToken} onTokenChange={setReplicateToken} />
          <ImageUpload label="Upload Garment Image" onImageUpload={setGarmImg} />
          <ImageUpload label="Upload Human Image" onImageUpload={setHumanImg} />
          <GarmentDescription onDescriptionChange={setGarmentDes} onSubmit={handleTryOn} isLoading={isLoading} />
          <TryOnResult result={result} isLoading={isLoading} />
        </VStack>
      </Box>
      <Examples />
    </ChakraProvider>
  );
};