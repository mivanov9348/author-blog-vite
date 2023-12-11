import React from "react";
import { Grid, Typography, Paper, Box, Link } from "@mui/material";

export default function MainPost({ post }) {
  return (
    <Paper
      elevation={24}
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        mt: 3,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image})`,
        height: { xs: "400px", md: "400px" },
        borderRadius: "20px",
        "&:hover": {
          border: 2,
          borderColor: "black.500",
          color: "grey",
          cursor: "pointer",
        },
      }}
    >
      {<img style={{ display: "none" }} src={post.image} alt="Character" />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
          borderRadius: "20px",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.content}
            </Typography>
            <Link variant="subtitle1" href="#">
              Link
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
