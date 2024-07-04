import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchCharacters } from "../api/starWarsApi";
import { CharacterResponse } from "../types/types";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CharacterList from "../components/character/CharacterList";
import { useApiFetch } from "../hooks/useApiFetch";
import PaginationControls from "../components/common/PaginationControls";
import NoDataAvailable from "../components/common/NoDataAvailable";
import useSearchHook from "../hooks/useSearchHook";
import SearchInput from "../components/common/form/SearchInput";
import Layout from "../components/common/Layout";

const HomePage: React.FC = () => {
  const { searchQuery, handleSearchChange, applySearchQuery } = useSearchHook();
  const location = useLocation();
  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(query.get("page") || "1", 10)
  );
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const {
    data: charactersData,
    loading,
    error,
  } = useApiFetch<CharacterResponse>(
    () => fetchCharacters(currentPage, searchQuery),
    [currentPage, searchQuery]
  );

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    const handler = setTimeout(() => {
      applySearchQuery();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, applySearchQuery, isFirstLoad]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  return (
    <Layout>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      <SearchInput value={searchQuery} onChange={handleSearchChange} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {charactersData && charactersData.results.length > 0 ? (
        <>
          <CharacterList characters={charactersData.results} />
          <PaginationControls
            count={Math.ceil(charactersData.count / 10)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            disabled={loading}
          />
        </>
      ) : (
        <NoDataAvailable />
      )}
    </Layout>
  );
};

export default HomePage;
