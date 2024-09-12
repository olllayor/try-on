import React from 'react';
import { Box, Heading, SimpleGrid, Image } from '@chakra-ui/react';

const Examples = () => {
    // Array of example image URLs
    const exampleImages = [
        'image.png',
        '4.png',
        '2.png',
        '6.png',
        'image1.png',
        '18.jpg',
        '5.png',
        '8.png',
        'image2.png',
        '19.jpg',
        '3.png',
        '7.png',

    // Add more example image URLs as needed
  ];

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading>Examples</Heading>
      <SimpleGrid columns={4} spacing={4}>
        {exampleImages.map((url, index) => (
          <Image 
          key={index} 
          src={url} 
          alt={`Example ${index + 1}`} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Examples;