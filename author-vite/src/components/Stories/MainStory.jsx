import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

export default function MainStory({ story }) {
  if (!story) {
    return null;
  }
  const sanitizedSummary = DOMPurify.sanitize(story.summary);

  return (
    <Card
      sx={{
        marginBottom: 2,
        maxWidth: "100%",
        maxHeight: "420px",
        borderRadius: "10px",
        border: "3px solid gray",
        ":hover": {
          boxShadow: "0px 0px 5px 5px gray",
        },
      }}
    >
      <CardActionArea component={NavLink} to={`/stories/${story._id}`}>
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:3000${story.image}`}
          alt={story.image}
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ borderTop: "4px solid gray" }}>
          <Typography gutterBottom variant="h5" component="div">
            {story.title}
          </Typography>
          <Typography variant="body2" color="green">
            {new Date(story.datePosted).toLocaleDateString()}
          </Typography>

          <Typography
            variant="body1"
            color="text.primary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(story.content),
            }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
