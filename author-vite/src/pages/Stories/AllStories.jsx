import { useState } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import MainStory from "../../components/Stories/MainStory";
import Sidebar from "../../components/Stories/Sidebar";
import StoryCard from "../../components/Stories/StoryCard";
import stories from "../../../public/data/stories.json";

export default function AllStories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mainStory = stories.find((story) => story.mainStory === true);

  function handleChangeCategory(category) {
    setSelectedCategory(category);
    console.log(category);
  }

  const filteredStories =
    selectedCategory && selectedCategory.toLowerCase() !== "all"
      ? stories.filter(
          (story) =>
            story.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : stories;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          color: "white",
          padding: 1,
          ":hover": {
            boxShadow: "0px 0px 5px 5px gray",
          },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", minHeight: "100vh" }}
        >
          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Sidebar onCategorySelect={handleChangeCategory} />
          </Grid>
          <Grid item xs={12} md={10}>
            <MainStory story={mainStory} />
            <Grid container spacing={2}>
              {filteredStories.map((story, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <StoryCard story={story} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
