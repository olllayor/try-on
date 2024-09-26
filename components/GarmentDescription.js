import React, { useState } from 'react';
import { FormControl, FormLabel, Textarea, Button, Text, VStack } from '@chakra-ui/react';

const MAX_CHARS = 200;

export default function GarmentDescription({ onDescriptionChange, onSubmit, isLoading }) {
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= MAX_CHARS) {
      setDescription(input);
      onDescriptionChange(input);
    }
  };

  return (
    <VStack spacing={2} align="stretch">
      <FormControl isRequired>
        <FormLabel>Describe the garment</FormLabel>
        <Textarea
          value={description}
          onChange={handleChange}
          placeholder="e.g., A red cotton t-shirt with a round neck"
          resize="vertical"
        />
        <Text fontSize="sm" color={description.length > MAX_CHARS * 0.9 ? "red.500" : "gray.500"}>
          {description.length}/{MAX_CHARS} characters
        </Text>
      </FormControl>
      <Button
        onClick={onSubmit}
        isLoading={isLoading}
        loadingText="Processing..."
        isDisabled={description.length === 0 || description.length > MAX_CHARS}
      >
        Try On
      </Button>
    </VStack>
  );
}