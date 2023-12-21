import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Header() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  function isActive(path) {
    return location.pathname === path;
  }

  function handleLogout() {
    logout();
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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex">
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
        </Box>

        <Box display="flex">
          {!user ? (
            <>
              {" "}
              <Button
                color="inherit"
                component={NavLink}
                to="/auth"
                sx={{
                  fontWeight: isActive("/login") ? "bolder" : "normal",
                }}
              >
                Login/Register
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="h6"
                sx={{ marginRight: 2 }}
                component={NavLink}
                to="/userconfig"
              >
                {user.email.split("@")[0]}
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: "normal" }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
