import { Modal, Box, TextField, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function AddPostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  function handleSetPost() {
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const newPost = {
          title,
          content,
          image: data.imagePath,
          upvotes: 0,
          comments: [],
        };

        return fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        });
      })
      .then((response) => response.json())
      .then(() => {
        alert("Post created successfully.");
        setTitle("");
        setContent("");
        setImage(null);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while saving the post.");
      });
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "700px",
          bgColor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          backgroundColor: "darkgray",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton>
            <CloseIcon onClick={onClose} />
          </IconButton>
        </Box>

        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
        </Box>

        <Box sx={{ mb: 1, border: "2px solid black", height: "250px" }}>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "200px" }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {image && <p>File selected: {image.name}</p>}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            pt: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#222",
              transition:
                "background-color 0.5s, color 0.5s, border-radius 0.5s, opacity 0.5s",
              ":hover": {
                backgroundColor: "#333",
                color: "black",
                fontWeight: "bolder",
                borderRadius: "10px",
                opacity: 0.7,
                transitionDelay: "0.1s",
              },
            }}
            onClick={handleSetPost}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
