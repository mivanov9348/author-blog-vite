import React, { useState } from "react";
import "./Blog.css";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  createTheme,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MainPost from "../../components/Blog/MainPost";
import FeaturedPosts from "../../components/Blog/FeaturedPosts";

const posts = [
  {
    id: 1,
    date: "2023-11-11",
    title: "Post One",
    content: "Post One Content",
    image: "../public/Images/wall.png",
  },
  {
    id: 2,
    date: "2023-08-08",
    title: "Post Two",
    contnet: "Post Two Content",
    image: "../public/Images/1.png",
  },
  {
    id: 3,
    date: "2023-7-7",
    title: "Post Three",
    content: "Post Three Content",
    image: "../public/Images/2.png",
  },
];

const theme = createTheme({
  status: {
    danger: "red  ",
  },
});

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const title = post.title || ""; // Fallback to empty string if undefined
    const content = post.content || ""; // Fallback to empty string if undefined

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ borderRadius: "20px" }}>
        <main>
          <MainPost post={posts[0]} />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
          <Grid container spacing={4}>
            {filteredPosts.map((post) => (
              <FeaturedPosts key={post.id} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </div>
  );
}
