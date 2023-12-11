import React from "react";
import {
  CssBaseline,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const stories = [
  {
    title: "Creating Authentic Character Relationships",
    summary:
      "As storytellers, we often look for ways to make our characters as lifelike as possible: we give them internal struggles, external goals, difficult challenges, and hard choices to make...",
    url: "/story/creating-authentic-character-relationships",
  },
  {
    title: "Originality in Storytelling",
    summary:
      "Most storytellers strive to write fresh, original stories. They're hoping to come up with an idea that's never been done before...",
    url: "/story/originality-in-storytelling",
  },
];

export default function AllStories() {
  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        {stories.map((story, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                marginBottom: 2,
                backgroundColor: index === 0 ? "primary.main" : "white", // highlight the first story
                color: index === 0 ? "primary.contrastText" : "text.primary", // adjust text color for contrast
              }}
            >
              <CardActionArea component={Link} to={story.url}>
                <CardContent>
                  <Typography
                    variant={index === 0 ? "h4" : "h5"}
                    component="div"
                    sx={{
                      fontWeight: index === 0 ? "bold" : "normal", // make the first title bolder
                    }}
                  >
                    {story.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {story.summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
