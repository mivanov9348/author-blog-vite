import React, { useState } from "react";
import ImageCard from "../../components/Gallery/ImageCard";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

export default function Gallery() {
  const [page, setPage] = useState(1);
  const imagesPerPage = 15;
  const totalImages = 45; // Assuming you have a total of 45 images
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  // Dummy array of images for demonstration

  // Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calculate range for current page
  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {currentImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <ImageCard imageSrc={"https://localhost:3000/uploads/6.png"} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
}
