import { useState } from "react";
import {
  // Importing necessary Material-UI components
  CssBaseline,
  Container,
  Grid,
  Typography,
  CardMedia,
  IconButton,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useNavigate, useParams } from "react-router-dom";
import posts from "../../../public/data/posts.json";
import { Fragment } from "react";

export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const post = posts.find((post) => post.id === parseInt(id));

  const [showComments, setShowComments] = useState(false);

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

  function toggleComments() {
    setShowComments(!showComments);
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
          <Button onClick={toggleComments}>
            Comments ({post.comments.length})
          </Button>
          {showComments && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained">Post Comment</Button>
              <List>
                {post.comments.map((comment, index) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={comment.author}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {comment.date}
                            </Typography>
                            {" — " + comment.content}
                          </>
                        }
                      />
                    </ListItem>
                    {index < post.comments.length - 1 && <Divider />}
                  </>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
