import React, { useState, useEffect, lazy, Suspense } from "react";
import { Typography } from "@mui/material";
import { fetchCharacters } from "@/api/starWarsApi";
import { CharactersResponse, CharactersSuccessResponse } from "@/types/types";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useApiFetch } from "@/hooks/useApiFetch";
import { useNavigate, useLocation } from "react-router-dom";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import debounce from "lodash/debounce";
import Layout from "@/components/common/Layout";
import SearchInput from "@/components/common/form/SearchInput";

const CharacterList = lazy(
  () => import("@/components/character/CharacterList")
);
const PaginationControls = lazy(
  () => import("@/components/common/PaginationControls")
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState<string>(
    query.get("search") || ""
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery);
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(query.get("page") || "1", 10)
  );
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isPageChangeDisabled, setIsPageChangeDisabled] =
    useState<boolean>(false);

  const {
    data: charactersData,
    loading,
    error,
  } = useApiFetch<CharactersResponse>(
    () => fetchCharacters(currentPage, debouncedSearchQuery),
    [currentPage, debouncedSearchQuery]
  );

  const debouncedSetSearchQuery = debounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 1000);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    setIsPageChangeDisabled(true);
    debouncedSetSearchQuery(searchQuery);

    return () => {
      debouncedSetSearchQuery.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (!isFirstLoad) {
      navigate(`?search=${debouncedSearchQuery}&page=${currentPage}`, {
        replace: true,
      });
    }
  }, [debouncedSearchQuery, currentPage, navigate, isFirstLoad]);

  useEffect(() => {
    if (!loading) {
      setIsPageChangeDisabled(false);
    }
  }, [loading]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <Typography variant="h3" gutterBottom>
        Star Wars Characters
      </Typography>
      <SearchInput value={searchQuery} onChange={handleSearchChange} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && (
        <>
          {charactersData &&
          (charactersData as CharactersSuccessResponse).results.length > 0 ? (
            <>
              <Suspense fallback={<LoadingSpinner />}>
                <CharacterList
                  characters={
                    (charactersData as CharactersSuccessResponse).results
                  }
                />
                <PaginationControls
                  count={Math.ceil(
                    (charactersData as CharactersSuccessResponse).count / 10
                  )}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  disabled={loading || isPageChangeDisabled}
                />
              </Suspense>
            </>
          ) : (
            <NoDataAvailable />
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
