import { useState, useCallback } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Alert, AlertIcon, useToast, Select, Button } from '@chakra-ui/react';
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
  const [category, setCategory] = useState('upper_body');
  const [history, setHistory] = useState([]);

  const toast = useToast();

  const handleTryOn = useCallback(async () => {
    if (!garmImg || !humanImg || !garmentDes || !replicateToken) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('garm_img', garmImg);
    formData.append('human_img', humanImg);
    formData.append('garment_des', garmentDes);
    formData.append('replicate_token', replicateToken);
    formData.append('category', category);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
      setHistory(prev => [...prev, { garmImg, humanImg, garmentDes, category, result: data.result }]);
      toast({
        title: 'Virtual try-on successful',
        description: 'The virtual try-on result has been received.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}. Please try again.`);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [garmImg, humanImg, garmentDes, replicateToken, category, toast]);

  const handleClearAll = useCallback(() => {
    setGarmImg(null);
    setHumanImg(null);
    setGarmentDes('');
    setResult('');
    setError('');
    setCategory('upper_body');
  }, []);

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding={8}>
        <VStack spacing={8}>
          <Heading>Virtual Try On App</Heading>
          <Text>Upload a garment image and a human image, then describe the garment to see how it looks!</Text>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <Text>{error}</Text>
            </Alert>
          )}
          <ReplicateTokenInput token={replicateToken} onTokenChange={setReplicateToken} />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="upper_body">Upper Body</option>
            <option value="lower_body">Lower Body</option>
            <option value="dresses">Dresses</option>
          </Select>
          <ImageUpload label="Upload Garment Image" onImageUpload={setGarmImg} />
          <ImageUpload label="Upload Human Image" onImageUpload={setHumanImg} />
          <GarmentDescription onDescriptionChange={setGarmentDes} onSubmit={handleTryOn} isLoading={isLoading} />
          <Button onClick={handleClearAll}>Clear All</Button>
          <TryOnResult result={result} isLoading={isLoading} />
        </VStack>
      </Box>
      <Examples />
    </ChakraProvider>
  );
}