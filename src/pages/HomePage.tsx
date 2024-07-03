import React, { useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CharacterList from '../components/CharacterList';
import { RootState } from '../store/configureStore'; // Updated path
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../api/starWarsApi';
import { setCharacters } from '../store/characterActions'; // Updated path
import { Character } from '../types/types'; // Import Character interface

const HomePage: React.FC = () => {
  const characters = useSelector((state: RootState) => state.characters.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await fetchCharacters();
      dispatch(setCharacters(response.results));
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  const handleCharacterClick = (character: Character) => {
    console.log('Clicked character:', character);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CharacterList characters={characters} onCharacterClick={handleCharacterClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
