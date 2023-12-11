import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "grey",
        color: "black",
        fontFamily: "Higher Jump",
        fontStyle: "italic",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1 }}
          component={NavLink}
          to="/author"
        >
          My Site
        </Typography>
        <Button color="inherit" component={NavLink} to="/author">
          Author
        </Button>
        <Button color="inherit" component={NavLink} to="/blog">
          Blog
        </Button>
        <Button color="inherit" component={NavLink} to="/stories">
          Stories
        </Button>

        <Button color="inherit" component={NavLink} to="/gallery">
          Gallery
        </Button>
      </Toolbar>
    </AppBar>
  );
}
