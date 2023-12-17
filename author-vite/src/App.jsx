import Blog from "./pages/Blog/Blog";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthLayout from "./components/Auth/AuthLayout";
import Author from "./pages/Author";
import AllStories from "./pages/Stories/AllStories";
import Gallery from "./pages/Gallery/Gallery";
import PostDetail from "./components/Blog/PostDetail";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import StoryDetails from "./components/Stories/StoryDetails";
import { AuthProvider } from "./contexts/AuthContext";
import UserConfig from "./components/User/UserConfig";
import AuthForm from "./components/Auth/AuthForm";

const theme = createTheme({
  palette: {
    background: {
      default: "#2f2f2f",
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="Author" element={<Author />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<PostDetail />} />
              <Route path="stories" element={<AllStories />} />
              <Route path="stories/:id" element={<StoryDetails />} />

              <Route path="gallery" element={<Gallery />} />

              <Route element={<AuthLayout />}>
                <Route path="auth" element={<AuthForm />} />
              </Route>
              <Route path="userconfig" element={<UserConfig />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
