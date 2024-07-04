import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { fetchCharacters } from "../api/starWarsApi";
import { useApiFetch } from "../hooks/useApiFetch";
import { Character } from "../types/types";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CharacterList from "../components/character/CharacterList";

interface CharacterResponse {
  results: Character[];
}

const HomePage: React.FC = () => {
  const { data, loading, error } =
    useApiFetch<CharacterResponse>(fetchCharacters);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
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
