import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ImageDetails({ open, onClose, image }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "black",
          boxShadow: 22,
          p: 1,
        }}
      >
        <img
          src={`http://localhost:3000/${image}`}
          alt="Enlarged"
          style={{ maxWidth: "100%", maxHeight: "80vh" }}
        />
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}
