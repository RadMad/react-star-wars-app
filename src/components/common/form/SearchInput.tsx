import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default SearchInput;
