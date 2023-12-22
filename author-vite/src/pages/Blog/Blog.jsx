import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import posts from "../../../public/data/posts.json";
import BlogSidebar from "../../components/Blog/BlogSidebar";
import MainPost from "../../components/Blog/MainPost";
import PostCard from "../../components/Blog/PostCard";
import AddPostModal from "../../components/Blog/AddPostModal";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ mt: 0, mb: 1 }}>
      <CssBaseline />
      {user && user.role === "admin" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 0,
          }}
        >
          <IconButton>
            <AddBoxIcon
              onClick={handleOpenModal}
              sx={{
                height: "40px",
                width: "40px",
                color: "white",
                mb: 0,
                mt: 0,
                ":hover": {
                  boxShadow: "0 1px 1px 1px darkgray",
                },
              }}
            />
          </IconButton>
        </Box>
      )}

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
      {modalOpen && <AddPostModal onClose={handleCloseModal} />}
    </Container>
  );
}
