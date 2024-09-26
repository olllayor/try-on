import React from 'react';
import { Box, Heading, SimpleGrid, Image } from '@chakra-ui/react';

const Examples = () => {
  const exampleImages = [
    'image.png', //1
    'image1.png',   //5
    'image2.png', //9
    '4.png',    //2
    '19.jpg',     //10
    '18.jpg',     //6
    '2.png',      //3
    '5.png',      //7
    '3.png',        //11
    '6.png',      //4
    '8.png',      //8
        '7.png',        //12
    ];

    return (
        <Box>
            
            <SimpleGrid columns={3} spacing={3} mt={100}>
                {exampleImages.map((url, index) => (
                    <Image 
                        key={index} 
                        src={url} 
                        alt={`Example ${index + 1}`}
                        objectFit="cover"
                        width="100%"
                        height="100px"
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Examples;