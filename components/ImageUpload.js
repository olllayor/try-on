// components/ImageUpload.js
import { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Image, Box } from '@chakra-ui/react';

export default function ImageUpload({ label, onImageUpload }) {
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <Box mt={4}>
          <Image src={preview} alt="Preview" maxH="200px" />
        </Box>
      )}
    </FormControl>
  );
}