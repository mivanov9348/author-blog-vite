import Blog from "./pages/Blog/Blog";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Author from "./pages/Author";
import AllBooks from "./pages/Books/AllBooks";
import Gallery from "./pages/Gallery";
import BookOne from "./pages/Books/BookOne";

export default function App() {
  return (
    <div>
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

            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
