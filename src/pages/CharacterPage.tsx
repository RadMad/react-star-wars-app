import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchCharacter from "../hooks/useFetchCharacter";
import LoadingSpinnerContainer from "../components/common/LoadingSpinnerContainer";
import CharacterForm from "../components/character/CharacterForm";
import ErrorMessageContainer from "../components/common/ErrorMessageContainer";

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
        <LoadingSpinnerContainer />
      ) : error ? (
        <ErrorMessageContainer message={error} />
      ) : (
        character && (
          <CharacterForm character={character} characterId={characterId} />
        )
      )}
    </Container>
  );
};

export default CharacterPage;
