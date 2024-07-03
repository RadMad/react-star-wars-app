// src/pages/CharacterPage.tsx

import React from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/configureStore'; // Adjust path as per your store configuration
import { updateCharacterName } from '../store/characterActions'; // Adjust path as per your action file
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const CharacterPage: React.FC = () => {
  const currentCharacter = useSelector((state: RootState) => state.characters.currentCharacter);
  const dispatch = useDispatch();

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: currentCharacter?.name || '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(updateCharacterName(data.name));
    // Implement save logic here (local storage or state management)
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Character Details
      </Typography>
      <div>
        <Typography variant="h5">{currentCharacter?.name}</Typography>
        {/* Display other character details here */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          {...register('name')}
          style={{ marginBottom: 20 }}
        />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default CharacterPage;
