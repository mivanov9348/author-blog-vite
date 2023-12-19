import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

export default function StoryCard({ story }) {
  const sanitizedSummary = DOMPurify.sanitize(story.summary);

  return (
    <Card
      sx={{
        maxWidth: 550,
        mb: 2,
        border: "3px solid gray",
        borderRadius: "10px",
        ":hover": {
          boxShadow: "0px 0px 5px 5px gray",
        },
      }}
    >
      <CardActionArea component={NavLink} to={`/stories/${story.id}`}>
        <CardMedia
          component="img"
          height="240"
          width="300"
          image={story.image}
          alt={story.title}
        />

        <CardContent sx={{ borderTop: "4px solid gray", height: "150px" }}>
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
      </CardActionArea>
    </Card>
  );
}
