import { Paper, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";

export default function AuthLayout() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} xs={{ mt: 50, p: 30 }}>
        <Outlet />
      </Paper>
    </Container>
  );
}
