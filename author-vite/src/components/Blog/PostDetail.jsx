import { useEffect, useState } from "react";
import {
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
import DOMPurify from "dompurify";

export default function PostDetail() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Post not found!");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchData();
  }, []);

  console.log(post);

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

  const contentSanitized = DOMPurify.sanitize(post.content);

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
            image={`http://localhost:3000${post.image}`}
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
            date
          </Typography>
          <Typography
            variant="body1"
            paragraph
            dangerouslySetInnerHTML={{ __html: contentSanitized }}
          />

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
        </Grid>{" "}
      </Grid>{" "}
    </Container>
  );
}
