import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "gray",
        color: "black",
        fontFamily: "Sylfaen",
        fontStyle: "italic",
        border: "2px solid black",
      }}
    >
      <Toolbar
        sx={{
          fontSize: "50px",
          "& > .MuiButton-root": {
            fontSize: "20px",
            fontFamily: "Sylfaen",
            ":hover": { fontWeight: "bolder" },
            fontWeight: (path) => (isActive(path) ? "bolder" : "normal"),
          },
        }}
      >
        <Button
          color="inherit"
          component={NavLink}
          to="/author"
          sx={{ fontWeight: isActive("/author") ? "bolder" : "normal" }}
        >
          Author
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/blog"
          sx={{ fontWeight: isActive("/blog") ? "bolder" : "normal" }}
        >
          Blog
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/stories"
          sx={{ fontWeight: isActive("/stories") ? "bolder" : "normal" }}
        >
          Stories
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/gallery"
          sx={{ fontWeight: isActive("/gallery") ? "bolder" : "normal" }}
        >
          Gallery
        </Button>
      </Toolbar>
    </AppBar>
  );
}
