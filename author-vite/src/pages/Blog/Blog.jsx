import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BlogSidebar from "../../components/Blog/BlogSidebar";
import MainPost from "../../components/Blog/MainPost";
import PostCard from "../../components/Blog/PostCard";
import AddPostModal from "../../components/Blog/AddPostModal";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../contexts/AuthContext";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { token } = useContext(AuthContext);

  async function handleDelete(postId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Delete the post!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error on fetching", error));
  }, []);

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

  console.log(filteredPosts);

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
          {filteredPosts.length > 1 && <MainPost post={filteredPosts[1]} />}
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
          <>
            <PostCard key={post.id} post={post} />
            <IconButton
              key={post.id}
              onClick={() => handleDelete(post._id)}
              sx={{
                color: "red",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ))}
      </Grid>
      {modalOpen && <AddPostModal onClose={handleCloseModal} />}
    </Container>
  );
}
