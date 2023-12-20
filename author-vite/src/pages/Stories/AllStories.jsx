import { useEffect, useState } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import MainStory from "../../components/Stories/MainStory";
import Sidebar from "../../components/Stories/Sidebar";
import StoryCard from "../../components/Stories/StoryCard";

export default function AllStories({ onStoryDelete }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error on fetching", error));
  }, []);

  const mainStory = stories.find((story) => story.mainStory === true);

  function onStoryDelete(deletedStoryId) {
    setStories((currentStories) =>
      currentStories.filter((story) => story._id !== deletedStoryId)
    );
  }

  function handleChangeCategory(category) {
    setSelectedCategory(category);
  }

  function addNewStoryToList(newStory) {
    setStories((prevStories) => [newStory, ...prevStories]);
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
            <Sidebar
              onCategorySelect={handleChangeCategory}
              onNewStoryAdded={addNewStoryToList}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <MainStory story={mainStory} />
            <Grid container spacing={2}>
              {filteredStories.map((story) => (
                <Grid item xs={12} sm={4} key={story._id}>
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
