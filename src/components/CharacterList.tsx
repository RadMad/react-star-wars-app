// src/components/CharacterList.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Character {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
}

interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
  return (
    <List>
      {characters.map((character, index) => (
        <ListItem button key={index} onClick={() => onCharacterClick(character)}>
          <ListItemText primary={character.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CharacterList;
