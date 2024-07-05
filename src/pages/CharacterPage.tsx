import React, { lazy, Suspense } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchCharacter from "@/hooks/useFetchCharacter";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Layout from "@/components/common/Layout";

const CharacterForm = lazy(
  () => import("@/components/character/CharacterForm")
);

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);
  const { character, loading, error } = useFetchCharacter(characterId);

  return (
    <Layout>
      <Typography variant="h3" gutterBottom>
        Character Details
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        character && (
          <Suspense fallback={<LoadingSpinner />}>
            <CharacterForm character={character} characterId={characterId} />
          </Suspense>
        )
      )}
    </Layout>
  );
};

export default CharacterPage;
