import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

const authorInfo = {
  name: "Jackson Rourke",
  description:
    "I'm Jackson Rourke, an author whose life and stories tread the thin line between the thrilling escapades of the Grand Theft Auto universe and the grounded reality of city life. In my mid-30s, I blend the narrative flair of an urban tale-spinner with the gritty realness of street wisdom. My journey? A blend of vibrant experiences, distilled into words that resonate with the soul of the city. I wear my history like a badge of honor – short, dark hair, a neatly trimmed beard, and eyes that reflect stories untold, often concealed behind a pair of aviator sunglasses. My attire? A black leather jacket over a classic white t-shirt, symbolizing a life lived unapologetically and on my own terms. As a writer, my laptop is my loyal companion, accompanying me in cozy cafes and the shadowed booths of local bars. It's here that I pour my observations and experiences onto the digital page, crafting narratives that are as much a part of me as the ink that runs through my veins. My novels? They're a wild ride through the underbelly of urban landscapes, a mix of crime, passion, and the relentless pursuit of dreams amidst chaos. But here, on this blog, I offer you something different – a glimpse into my mind, my views, and stories that extend beyond the pages of my books.",
  imageUrl: "../../public/Images/Author.png", // Replace with your image path
};

function AuthorPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="Author"
              src={authorInfo.imageUrl}
            />
          </Paper>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {authorInfo.name}
          </Typography>
          <Typography variant="body1">{authorInfo.description}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AuthorPage;
