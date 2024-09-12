// components/GarmentDescription.js
import { Input, Button, VStack } from '@chakra-ui/react';

export default function GarmentDescription({ onDescriptionChange, onSubmit, isLoading }) {
  return (
    <VStack spacing={4} width="100%">
      <Input
        placeholder="Describe the garment (e.g., 'cute pink top')"
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <Button onClick={onSubmit} isLoading={isLoading} loadingText="Processing" width="100%">
        Try On
      </Button>
    </VStack>
  );
}