import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddStoryModal from "./AddStoryModal";

export default function Sidebar({ onCategorySelect, onNewStoryAdded }) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleCategorySelect(category) {
    onCategorySelect(category);
  }

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#3e3e3e",
        padding: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: "10px",
        border: "3px solid gray",
      }}
    >
      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          mt: 0,
          mb: 1,
          backgroundColor: "darkgray",
          width: "100%",
          ":hover": {
            backgroundColor: "grey",
            color: "black",
          },
        }}
      >
        Add Story
      </Button>

      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          borderBottom: "2px solid gray",
          width: "100%",
        }}
      >
        Categories
      </Typography>

      <Button
        onClick={() => handleCategorySelect("All")}
        sx={{
          width: "100%",
          justifyContent: "center",
          color: "#FFF",
          ":hover": { border: "1px solid gray" },
        }}
      >
        All
      </Button>

      {modalOpen && (
        <AddStoryModal
          onClose={handleCloseModal}
          onNewStoryAdded={onNewStoryAdded}
        />
      )}
    </Box>
  );
}
