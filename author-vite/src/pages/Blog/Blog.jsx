import React from "react";
import AddPost from "../../components/BlogPosts/AddPost";
import BlogPosts from "../../components/BlogPosts/BlogPosts";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-sidebar">
        <div className="image-container">
          <img src="../../public/Images/Image.png" />
        </div>

        <div>
          <p>themes</p>
        </div>
      </div>

      <div className="blog-content">
        <div className="add-post-section">
          <AddPost />
        </div>

        <div className="posts-section">
          <BlogPosts />
        </div>
      </div>
    </div>
  );
}
