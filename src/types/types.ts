export interface Character {
  id: number;
  url: string;
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export interface CharactersSuccessResponse {
  results: Character[];
  count: number;
}

export interface ErrorResponse {
  error: unknown;
}

export type CharacterSuccessResponse = Character;

export type CharactersResponse = CharactersSuccessResponse | ErrorResponse;

export type CharacterResponse = CharacterSuccessResponse | ErrorResponse;
