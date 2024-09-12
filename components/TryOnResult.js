// components/TryOnResult.js
import { Box, Image, Spinner, Text, Button } from '@chakra-ui/react';

export default function TryOnResult({ result, isLoading }) {
  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>It can take up to 40-50 seconds...</Text>
      </Box>
    );
  }

  if (result) {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = result;
        link.download = 'try-on-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return (
        
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
            onClick={handleDownload} 
            mt={4}
            margin="auto"
        >
          Download Image
        </Button>
      </Box>
    );
  }

  return null;
}