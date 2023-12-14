import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useNavigate, useParams } from "react-router-dom";
import posts from "../../../public/data/posts.json";

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return (
      <Typography variant="h3" sx={{ textAlign: "center", marginTop: 4 }}>
        Story not Found!
      </Typography>
    );
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container maxWidth="xl" sx={{ my: 2, backgroundColor: "gray" }}>
      <CssBaseline />

      <IconButton onClick={handleBack} sx={{ mt: 2 }}>
        <KeyboardBackspaceSharpIcon sx={{ fontSize: "30px" }} />
      </IconButton>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            image={post.image}
            alt={post.title}
            sx={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              border: "2px solid black",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ borderBottom: "2px solid black" }}
          >
            {post.date}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="body2">
            👍 1, Comments ({post.comments.length})
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
