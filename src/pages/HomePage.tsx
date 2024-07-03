import React, { useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import CharacterList from '../components/CharacterList';
import { fetchCharacters } from '../api/starWarsApi';
import { useFetch } from '../hooks/useFetch';
import { Character } from '../types/types';
import ErrorMessage from '../components/ErrorMessage';
import { db } from '../db';

interface CharacterResponse {
  results: Character[];
}

const HomePage: React.FC = () => {
  const { data, loading, error } = useFetch<CharacterResponse>(fetchCharacters);

  useEffect(() => {
    const saveCharactersToDB = async (characters: Character[]) => {
      await db.characters.bulkPut(characters);
    };

    if (data) {
      saveCharactersToDB(data.results);
    }
  }, [data]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      {loading && (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <ErrorMessage message={error} />
        </Grid>
      )}
      {!loading && !error && data && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CharacterList characters={data.results} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
