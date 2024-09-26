import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Image, FormControl, FormLabel, useToast } from '@chakra-ui/react';

export default function ImageUpload({ label, onImageUpload }) {
  const toast = useToast();
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload an image smaller than 10MB.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  }, [onImageUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box
        {...getRootProps()}
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="md"
        p={4}
        textAlign="center"
        cursor="pointer"
        bg={isDragActive ? "gray.100" : "white"}
        transition="background-color 0.2s"
        _hover={{ bg: "gray.50" }}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <Image src={previewUrl} alt="Uploaded preview" maxH="200px" mx="auto" />
        ) : isDragActive ? (
          <Text>Drop the image here ...</Text>
        ) : (
          <Text>Drag and drop an image here, or click to select a file</Text>
        )}
      </Box>
    </FormControl>
  );
}