import React from "react";
import {
  Grid,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";

export default function FeaturedPosts({ post }) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card
          sx={{
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "grey",
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.content}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>{" "}
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 200,
              display: { xs: "none", sm: "block" },
            }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
