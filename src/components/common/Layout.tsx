import React, { ReactNode } from 'react';
import { Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Container style={{ maxWidth: '560px' }}>{children}</Container>;
};

export default Layout;
