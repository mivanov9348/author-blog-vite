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
  const { user, token } = useAuth();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stories/${story._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        await response.json(); // assuming your server responds with JSON
        onStoryDelete(story._id);
      } catch (error) {
        console.error("Error deleting the story!", error);
      }
    }
  }

  const sanitizedSummary = DOMPurify.sanitize(story.summary);

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
