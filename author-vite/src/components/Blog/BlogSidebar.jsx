import React from "react";
import { Paper, Typography, Divider, Link, Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function BlogSidebar() {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold" }}></Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Follow Me
        </Typography>
        <Typography variant="body1">
          <Link href="#" sx={{ mr: 2 }}>
            <TwitterIcon />
          </Link>
          <Link href="#">
            <InstagramIcon />
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
}
