import { CharacterResponse, Character } from "@/types/types";


const API_URL = "https://swapi.dev/api";

export const fetchCharacters = async (
  page: number = 1,
  searchQuery: string = ""
): Promise<CharacterResponse> => {
  try {
    let url = `${API_URL}/people/?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    return response.json() as Promise<CharacterResponse>;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`${API_URL}/people/${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with id ${id}`);
    }
    return response.json() as Promise<Character>;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
};
