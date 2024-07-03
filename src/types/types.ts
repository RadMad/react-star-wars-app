export interface Character {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
}

export interface CharacterResponse {
  results: Character[];
}

export interface CharacterState {
  characters: Character[];
  currentCharacter: Character | null;
}

export interface SetCharactersAction {
  type: typeof SET_CHARACTERS;
  payload: Character[];
}

export interface UpdateCharacterNameAction {
  type: typeof UPDATE_CHARACTER_NAME;
  payload: string;
}

export type CharacterAction = SetCharactersAction | UpdateCharacterNameAction;

export const SET_CHARACTERS = 'SET_CHARACTERS';
export const UPDATE_CHARACTER_NAME = 'UPDATE_CHARACTER_NAME';


  