import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

export default function PostCard({ post }) {
  const sanitizedSummary = DOMPurify.sanitize(post.summary);

  return (
    <Grid item xs={12} md={5.5}>
      <Box>
        <Card
          component={NavLink}
          to={`/blog/${post._id}`}
          sx={{
            display: "flex",
            borderRadius: "20px",
            backgroundColor: "grey",
            border: "3px solid darkgray",
            textDecoration: "none",
            ":hover": {
              boxShadow: "0 2px 2px 0 darkgray",
              cursor: "pointer",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: "250px",
              borderRight: "3px solid darkgray",
              display: { xs: "none", sm: "block" },
            }}
            image={`http://localhost:3000${post.image}`}
            alt={post.imageLabel}
          />
          <CardContent sx={{ flex: 1, height: 200 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
            />
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ color: "green", mb: 0 }}
            >
              Continue reading...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
}
