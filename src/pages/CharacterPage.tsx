// src/pages/CharacterPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Character } from '../types/types';
import { db } from '../db';

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const { handleSubmit, control, reset } = useForm<Character>();

  useEffect(() => {
    const fetchCharacter = async () => {
      const characterFromDb = await db.characters.get(Number(id));
      if (characterFromDb) {
        setCharacter(characterFromDb);
        reset(characterFromDb);
      }
    };

    fetchCharacter();
  }, [id, reset]);

  const onSubmit = async (data: Character) => {
    await db.characters.put({ ...data, id: Number(id) });
    setCharacter(data);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Character Details
      </Typography>
      {character && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField label="Name" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="height"
            control={control}
            render={({ field }) => <TextField label="Height" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="mass"
            control={control}
            render={({ field }) => <TextField label="Mass" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="hair_color"
            control={control}
            render={({ field }) => <TextField label="Hair Color" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="skin_color"
            control={control}
            render={({ field }) => <TextField label="Skin Color" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="eye_color"
            control={control}
            render={({ field }) => <TextField label="Eye Color" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="birth_year"
            control={control}
            render={({ field }) => <TextField label="Birth Year" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => <TextField label="Gender" variant="outlined" fullWidth margin="normal" {...field} />}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      )}
    </Container>
  );
};

export default CharacterPage;
