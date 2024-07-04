import React from "react";
import { Alert, Grid } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageContainer: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Alert severity="error">{message}</Alert>
    </Grid>
  );
};

export default ErrorMessageContainer;
