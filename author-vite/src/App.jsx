import Blog from "./pages/Blog/Blog";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Author from "./pages/Author";
import AllBooks from "./pages/Books/AllBooks";
import AllStories from "./pages/Stories/AllStories";
import Gallery from "./pages/Gallery/Gallery";
import BookOne from "./pages/Books/BookOne";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import StoryDetails from "./pages/Stories/StoryDetails";

const theme = createTheme({
  palette: {
    background: {
      default: "#2f2f2f",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Author" element={<Author />} />
            <Route path="blog" element={<Blog />} />

            <Route path="books/">
              <Route index element={<AllBooks />} />
              <Route path="all" element={<AllBooks />} />
              <Route path="bookOne" element={<BookOne />} />
            </Route>

            <Route path="stories" element={<AllStories />} />

            <Route path="stories/:id" element={<StoryDetails />} />

            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
