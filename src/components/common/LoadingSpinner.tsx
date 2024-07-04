import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

const LoadingSpinner: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingSpinner;
