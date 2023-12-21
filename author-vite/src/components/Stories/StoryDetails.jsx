import {
  Box,
  Typography,
  CssBaseline,
  Grid,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";

export default function StoryDetails() {
  const [showComments, setShowComments] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error on fetching", error));
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const story = stories.find((story) => story._id === id);

  if (!story) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h3">Story not Found!</Typography>
      </Box>
    );
  }

  const sanitizedSummary = DOMPurify.sanitize(story.summary);
  const sanitizedContent = DOMPurify.sanitize(story.content);

  function toggleComments() {
    setShowComments(!showComments);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Box
      sx={{
        flexGrow: 2,
        padding: 3,
        my: 4,
        mx: "auto",
        maxWidth: "800px",
        border: "4px solid black",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <CssBaseline />
      <IconButton onClick={handleBack} sx={{ marginTop: "-20px" }}>
        <KeyboardBackspaceSharpIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            height="400px"
            image={`http://localhost:3000${story.image}`}
            alt={story.title}
            sx={{
              width: "100%", // Responsive width
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            {story.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ marginBottom: 3 }}
          >
            Published on: {story.datePosted}
          </Typography>

          <Typography
            variant="body1"
            paragraph
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <Typography variant="body2" color="primary" sx={{ marginTop: 2 }}>
            👍 Likes: 1
          </Typography>
        </Grid>
      </Grid>{" "}
      <Button onClick={toggleComments} variant="contained" color="primary">
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>
      {showComments && (
        <Box sx={{ marginTop: 2 }}>
          {story.comments.map((comment, index) => (
            <Typography key={index}>
              nickname: {comment.nickname} - comment: {comment.comment}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
