import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Pagination,
  Box,
} from "@mui/material";
import { fetchCharacters } from "../api/starWarsApi";
import { CharacterResponse } from "../types/types";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CharacterList from "../components/character/CharacterList";
import { useApiFetch } from "../hooks/useApiFetch";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPaginating, setIsPaginating] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsPaginating(false);
    }, 1000);

    setIsPaginating(true);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {
    data: charactersData,
    loading,
    error,
  } = useApiFetch<CharacterResponse>(
    () => fetchCharacters(currentPage, debouncedSearchQuery),
    [currentPage, debouncedSearchQuery]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <Container style={{ maxWidth: "560px" }}>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        autoComplete="off"
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && charactersData && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {charactersData.results.length > 0 ? (
              <>
                <CharacterList characters={charactersData.results} />
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Pagination
                    count={Math.ceil(charactersData.count / 10)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={isPaginating}
                  />
                </Grid>
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100px"
              >
                <Typography variant="h6" color="textSecondary">
                  No data available
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
