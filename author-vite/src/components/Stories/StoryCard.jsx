import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";
import { useAuth } from "../../contexts/AuthContext";

export default function StoryCard({ story, onStoryDelete }) {
  const sanitizedSummary = DOMPurify.sanitize(story.summary);
  const { user } = useAuth();

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:3000/api/stories/${story._id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            // If the server responded with a non-OK status, we throw an error to jump to the catch block
            throw new Error(`HTTP status ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          onStoryDelete(story._id);
        })
        .catch((error) => {
          console.error("Error deleting the story:", error);
        });
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 550,
        mb: 2,
        border: "3px solid gray",
        borderRadius: "10px",
        backgroundColor: "gray",
        ":hover": {
          boxShadow: "0px 0px 5px 5px gray",
        },
      }}
    >
      <CardActionArea component={NavLink} to={`/stories/${story._id}`}>
        <CardMedia
          component="img"
          height="240"
          width="300"
          image={`http://localhost:3000${story.image}`}
          alt={story.title}
        />

        <CardContent
          sx={{
            borderTop: "4px solid gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {story.title}
          </Typography>
          <Typography variant="body2" color="green">
            {new Date(story.datePosted).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
          />
        </CardContent>
      </CardActionArea>{" "}
      {user && user.role === "admin" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button sx={{ color: "red" }} onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Card>
  );
}
