import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Box component="main" sx={{ marginTop: 8, marginBottom: 2 }}>
          <Outlet />
        </Box>
      </main>
      <Footer />
    </div>
  );
}
