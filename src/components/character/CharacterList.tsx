import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { extractIdFromUrl } from "../../utils";
import { Character } from "../../types/types";

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <List>
      {characters.map((character, index) => (
        <Tooltip key={index} arrow title="Click to see details">
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={`/character/${extractIdFromUrl(character.url)}`}
            >
              <ListItemText primary={character.name} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default CharacterList;
