import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
import posts from "../../../public/data/posts.json";
import BlogSidebar from "../../components/Blog/BlogSidebar";
import MainPost from "../../components/Blog/MainPost";
import PostCard from "../../components/Blog/PostCard";
import { useState } from "react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ mt: 2, mb: 2 }}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <IconButton>
          <AddIcon
            component={NavLink}
            to={""}
            sx={{
              height: "40px",
              width: "auto",
              border: "4px solid darkgray",
              ":hover": {
                boxShadow: "0 1px 1px 1px darkgray",
              },
            }}
          />
        </IconButton>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "stretch", height: "fit-content" }}
      >
        <Grid item xs={12} md={2}>
          <BlogSidebar />
        </Grid>

        <Grid item xs={12} md={10}>
          <MainPost post={posts[0]} />
        </Grid>
      </Grid>
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
        sx={{ mb: 4, backgroundColor: "white", borderRadius: "10px", mt: 2 }}
      />
      <Grid container spacing={4}>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
}
