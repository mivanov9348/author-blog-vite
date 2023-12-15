import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Grid item xs={12} md={6}>
      <Card
        component={NavLink}
        to={`/blog/${post.id}`}
        sx={{
          display: "flex",
          borderRadius: "20px",
          backgroundColor: "grey",
          border: "3px solid darkgray",
          textDecoration: "none",
          ":hover": {
            boxShadow: "0 2px 2px 0 darkgray",
            cursor: "pointer",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 160,
            height: "250px",
            borderRight: "3px solid darkgray",
            display: { xs: "none", sm: "block" },
          }}
          image={post.image}
          alt={post.imageLabel}
        />

        <CardContent sx={{ flex: 1, height: 200 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.summary}
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ color: "green", mb: 0 }}
          >
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
