import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="author">Author</NavLink>
        <NavLink to="blog">Blog</NavLink>

        <div className="dropdown">
          <NavLink to="/books/all" className="dropbtn">
            Books
          </NavLink>
          <div className="dropdown-content">
            <NavLink to="/books/bookOne">Book One</NavLink>
          </div>
        </div>

        <NavLink to="gallery">Gallery</NavLink>
      </nav>
    </header>
  );
}
