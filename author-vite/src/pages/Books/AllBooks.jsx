import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";

export default function Books() {
  const books = [
    {
      id: 1,
      name: "Whispers of the Ancients",
      description:
        "A captivating tale of a lost ancient civilization, unearthed secrets, and a mysterious artifact that holds the power to change the course of history.",
      image: "../.../public/Images/1.png",
    },
    {
      id: 2,
      name: "Shadows Over Tomorrow",
      description:
        "In a dystopian future where hope seems fleeting, a band of unlikely heroes emerges to challenge the oppressive regime and bring light to a dark world.",
      image: "../.../public/Images/2.png",
    },
    {
      id: 3,
      name: "Echoes of a Starlit Sea",
      description:
        "An epic saga of love and adventure set against the backdrop of a magical, war-torn sea, where every wave whispers tales of ancient lore.",
      image: "../.../public/Images/3.png",
    },
  ];

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Books
            </Typography>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
