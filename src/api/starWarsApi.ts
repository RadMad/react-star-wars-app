import {
  CharacterResponse,
  CharacterSuccessResponse,
  CharactersResponse,
  CharactersSuccessResponse,
} from "@/types/types";

const API_URL = "https://swapi.dev/api";

export const fetchCharacters = async (
  page: number = 1,
  searchQuery: string = ""
): Promise<CharactersResponse> => {
  try {
    let url = `${API_URL}/people/?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    return response.json() as Promise<CharactersSuccessResponse>;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { error };
  }
};

export const fetchCharacterById = async (
  id: number
): Promise<CharacterResponse> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with id ${id}`);
    }
    return response.json() as Promise<CharacterSuccessResponse>;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    return { error };
  }
};
