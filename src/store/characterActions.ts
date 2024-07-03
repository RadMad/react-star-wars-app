// src/store/characterActions.ts

import { Character } from '../types/types';

export const SET_CHARACTERS = 'SET_CHARACTERS';
export const UPDATE_CHARACTER_NAME = 'UPDATE_CHARACTER_NAME';

export const setCharacters = (characters: Character[]) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

export const updateCharacterName = (name: string) => ({
  type: UPDATE_CHARACTER_NAME,
  payload: name,
});
