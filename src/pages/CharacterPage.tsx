import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchCharacter from "../hooks/useFetchCharacter";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CharacterForm from "../components/character/CharacterForm";
import ErrorMessage from "../components/common/ErrorMessage";

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const characterId = Number(id);
  const { character, loading, error } = useFetchCharacter(characterId);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Character Details
      </Typography>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        character && (
          <CharacterForm character={character} characterId={characterId} />
        )
      )}
    </Container>
  );
};

export default CharacterPage;
