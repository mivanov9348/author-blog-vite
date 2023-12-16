import { useEffect, useState } from "react";
import ImageCard from "../../components/Gallery/ImageCard";
import ImageDetails from "../../components/Gallery/ImageDetails";
import {
  Grid,
  Pagination,
  Box,
  IconButton,
  Snackbar,
  Input,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { fetchImages, uploadImage } from "../../utils/imageService"; // Import the functions

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchImages()
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        console.log("There is a problem with fetching data:", error);
      });
  }, []);

  const imagesPerPage = 12;
  const totalImages = images.length;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleOpenImageModal(image) {
    setSelectedImage(image);
    setShowImageModal(true);
  }

  function handleCloseModal() {
    setShowImageModal(false);
  }

  function handleOpenAddImage() {
    setAddImage(true);
  }

  function handleCloseAddImage() {
    setAddImage(false);
  }

  function handleFileChange(event) {
    if (event.target.files[0]) {
      setFileInput(event.target.files[0]);
    }
  }

  function handleUpload() {
    if (!fileInput) {
      console.error("No file selected.");
      return;
    }

    uploadImage(fileInput)
      .then((data) => {
        console.log("Image imported successfully!", data);
        setOpenSnackbar(true);
        fetchImages().then(setImages);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <Box sx={{ flexGrow: 1, position: "relative" }}>
      {addImage ? (
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}>
          <IconButton onClick={handleCloseAddImage} color="inherit">
            <CloseIcon />
          </IconButton>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disableUnderline
          />
          <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>
            Upload
          </Button>
        </Box>
      ) : (
        <IconButton
          onClick={() => handleOpenAddImage()}
          sx={{
            position: "absolute",
            mt: 2,
            ml: 2,
            color: "white",
            ":hover": {
              backgroundColor: "wheat",
              color: "black",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      )}

      <Grid container spacing={2}>
        {currentImages.map((img, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            key={index}
            sx={{ mt: 5 }}
            onClick={() => handleOpenImageModal(img)}
          >
            <ImageCard image={img} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          color: "white",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      {showImageModal && (
        <ImageDetails
          open={showImageModal}
          onClose={handleCloseModal}
          image={selectedImage}
        />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Image uploaded successfully!"
      />
    </Box>
  );
}
