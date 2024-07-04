import React from "react";
import { Box, Typography } from "@mui/material";

interface NoDataAvailableProps {
  height?: string | number;
}

const NoDataAvailable: React.FC<NoDataAvailableProps> = ({ height = "100px" }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      <Typography variant="h6" color="textSecondary">
        No data available
      </Typography>
    </Box>
  );
};

export default NoDataAvailable;
