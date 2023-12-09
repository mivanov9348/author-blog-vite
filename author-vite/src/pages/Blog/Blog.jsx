import React, { useState } from "react";
import BlogPosts from "../../components/BlogPosts/BlogPosts";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import BlogPreview from "../../components/BlogPosts/BlogPreview";
import "./Blog.css";

const posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
];

export default function Blog() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submit logic here
    setModalOpen(false); // Close modal after submit
  };

  return (
    <div className="blog-container">
      <Button className="addPostBtn" onClick={() => setModalOpen(true)}>
        {"Add Post"}
      </Button>

      {modalOpen && (
        <Modal onClose={handleCloseModal} onSubmit={handleSubmit} />
      )}

      <div className="blog-content">
        {" "}
        <BlogPreview posts={posts} />
        <div className="posts-section"></div>
      </div>
    </div>
  );
}
