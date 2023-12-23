import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DOMPurify from "dompurify";

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({
    title: false,
    content: false,
    image: false,
  });
  const [editedStory, setEditedStory] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch(`http://localhost:3000/api/stories/${id}`);
        if (!response.ok) {
          throw new Error("Story not found");
        }
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStory();
  }, [id]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!story) {
    return <Typography>Story not found.</Typography>;
  }

  const sanitizedContent = DOMPurify.sanitize(story.content);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ px: 2 }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          bgcolor: "#f5f5f5",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: "#1976d2" }}
        >
          Back
        </Button>
        <CardMedia
          component="img"
          height="400"
          image={`http://localhost:3000${story.image}`}
          alt={story.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {story.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {story.datePosted}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            sx={{ lineHeight: "1.6" }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
