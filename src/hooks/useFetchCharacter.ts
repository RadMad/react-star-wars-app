import { useState, useEffect } from "react";
import { db } from "../db";
import { Character } from "../types/types";
import { fetchCharacterById } from "../api/starWarsApi";

const useFetchCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);

      try {
        const characterFromDb = await db.characters.get(id);
        if (characterFromDb) {
          setCharacter(characterFromDb);
        } else {
          const characterFromApi = await fetchCharacterById(id);
          setCharacter(characterFromApi as Character);
        }
      } catch (err) {
        setError("An error occurred while fetching character data.");
        console.error("Error fetching character:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return { character, loading, error };
};

export default useFetchCharacter;
