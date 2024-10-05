import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box, Paper } from "@mui/material";
import PrimarySearchAppBar from "./AppBar";

const Layout: React.FC = () => {
  return (
    <div>
      <PrimarySearchAppBar />
      <Container maxWidth="lg">
        <Box mt={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Outlet />
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Layout;
