import { useState, useCallback } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  useToast,
  Select,
  Button,
  SimpleGrid,
  Image,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import { useSession, signIn, signOut } from "next-auth/react";
import ImageUpload from '../components/ImageUpload';
import GarmentDescription from '../components/GarmentDescription';
import TryOnResult from '../components/TryOnResult';
import ReplicateTokenInput from '../components/ReplicateTokenInput';
import Examples from '@/components/Examples';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();
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
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleTryOn = useCallback(async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to use the try-on model.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      signIn('google');
      return;
    }

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
  }, [garmImg, humanImg, garmentDes, replicateToken, category, toast, session]);

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
      <Box position="relative" minHeight="100vh">
        <Stack
          direction={isLargerThan768 ? "row" : "column"}
          spacing={8}
          maxWidth="1200px"
          margin="auto"
          padding={4}
        >
          <Box flex={isLargerThan768 ? "2" : "1"} width="100%">
            <VStack spacing={6} align="stretch">
              <Flex justifyContent="space-between" alignItems="center" flexDirection={isLargerThan768 ? "row" : "column"}>
                <Heading size={isLargerThan768 ? "xl" : "lg"}>Virtual Try On App</Heading>
                
                {session ? (
                  <Flex alignItems="center" mt={isLargerThan768 ? 0 : 4}>
                    {/* User Image */}
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt={`${session.user.name}'s profile picture`}
                        boxSize="40px"
                        borderRadius="full"
                        mr={4} // Add some margin between the image and the sign-out button
                      />
                    )}
                    {/* Sign-out Button */}
                    <Button onClick={() => signOut()}>Sign out</Button>
                  </Flex>
                ) : (
                  <Button
                    onClick={() => signIn('google')}
                    leftIcon={<Image src="https://cdn-icons-png.flaticon.com/512/720/720255.png" alt="Google logo" boxSize="20px" />}
                    mt={isLargerThan768 ? 0 : 4}
                  >
                    Sign in with Google
                  </Button>
                )}
              </Flex>


              <Text fontSize={isLargerThan768 ? "md" : "sm"}>
                {session ? `Welcome, ${session.user.name}!` : 'Welcome!'} Upload a garment image and a human image, then describe the garment to see how it looks!
              </Text>
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
              <SimpleGrid columns={isLargerThan768 ? 2 : 1} spacing={4}>
                <ImageUpload label="Upload Garment Image" onImageUpload={setGarmImg} />
                <ImageUpload label="Upload Human Image" onImageUpload={setHumanImg} />
              </SimpleGrid>
              <GarmentDescription onDescriptionChange={setGarmentDes} onSubmit={handleTryOn} isLoading={isLoading} />
              <Button onClick={handleClearAll}>Clear All</Button>
              <TryOnResult result={result} isLoading={isLoading} />
            </VStack>
          </Box>
          
          {/* Display Examples on the right for larger screens */}
          {isLargerThan768 && (
            <Box flex="1.5">
              <Examples />
            </Box>
          )}
        </Stack>

        {/* Display Examples at the bottom for smaller screens */}
        {!isLargerThan768 && (
          <Box mt={8}>
            <Examples />
          </Box>
        )}
        
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
