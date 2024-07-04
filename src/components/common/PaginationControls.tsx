import React from "react";
import { Pagination as MuiPagination, Grid } from "@mui/material";

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
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color={color}
        disabled={disabled}
      />
    </Grid>
  );
};

export default PaginationControls;
