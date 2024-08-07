import React from "react";
import { Pagination, Grid } from "@mui/material";

interface PaginationControlsProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  color?: "primary" | "secondary";
  disabled?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  count,
  page,
  onChange,
  color = "primary",
  disabled = false,
}) => {
  if (count <= 1) {
    return null;
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color={color}
        disabled={disabled}
        sx={{ marginX: "-8px" }}
      />
    </Grid>
  );
};

export default PaginationControls;
