import React, { ReactNode } from "react";
import { Container } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      style={{ maxWidth: "560px", paddingLeft: "4px", paddingRight: "4px" }}
    >
      {children}
    </Container>
  );
};

export default Layout;
