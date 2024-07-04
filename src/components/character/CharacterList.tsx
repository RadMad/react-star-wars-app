// src/components/CharacterList.tsx

import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { extractIdFromUrl } from "../../utils";
import { Character } from "../../types/types";

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  const navigate = useNavigate();

  const handleCharacterClick = (character: Character) => {
    console.log("Clicked character:", character);
    navigate(`/character/${extractIdFromUrl(character.url)}`);
  };
  return (
    <List>
      {characters.map((character, index) => (
        <ListItem
          button
          key={index}
          onClick={() => handleCharacterClick(character)}
        >
          <ListItemText primary={character.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CharacterList;
