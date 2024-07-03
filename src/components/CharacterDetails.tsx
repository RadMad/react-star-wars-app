// src/components/CharacterDetail.tsx

import React from 'react';
import { Paper, Typography } from '@mui/material';

interface Character {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
}

interface CharacterDetailProps {
  character: Character | null;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  if (!character) return null;

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h5">{character.name}</Typography>
      <Typography variant="body1">Birth Year: {character.birth_year}</Typography>
      <Typography variant="body1">Height: {character.height} cm</Typography>
      <Typography variant="body1">Mass: {character.mass} kg</Typography>
    </Paper>
  );
};

export default CharacterDetail;
