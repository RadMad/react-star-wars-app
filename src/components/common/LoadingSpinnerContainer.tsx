import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

const LoadingSpinnerContainer: React.FC = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <CircularProgress />
    </Grid>
  );
};

export default LoadingSpinnerContainer;
