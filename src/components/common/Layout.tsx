import React, { ReactNode } from "react";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      style={{ maxWidth: "560px", paddingLeft: "4px", paddingRight: "4px" }}
    >      
      <ToastContainer />
      {children}
    </Container>
  );
};

export default Layout;
