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
import { useNavigate, useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState<string>(query.get("search") || "");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(searchQuery);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(query.get("page") || "1", 10));
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const { data: charactersData, loading, error } = useApiFetch<CharacterResponse>(
    () => fetchCharacters(currentPage, debouncedSearchQuery),
    [currentPage, debouncedSearchQuery]
  );

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!isFirstLoad) {
      navigate(`?search=${debouncedSearchQuery}&page=${currentPage}`, { replace: true });
    }
  }, [debouncedSearchQuery, currentPage, navigate, isFirstLoad]);

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
      {charactersData && (
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
                    disabled={loading}
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
