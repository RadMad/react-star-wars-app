// src/store/characterReducer.ts

import { CharacterAction, CharacterState, SET_CHARACTERS, UPDATE_CHARACTER_NAME } from '../types/types';

const initialState: CharacterState = {
  characters: [],
  currentCharacter: null,
};

const characterReducer = (state = initialState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };
    case UPDATE_CHARACTER_NAME:
      if (state.currentCharacter) {
        return {
          ...state,
          currentCharacter: {
            ...state.currentCharacter,
            name: action.payload,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default characterReducer;
