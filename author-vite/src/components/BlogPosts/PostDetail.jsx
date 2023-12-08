import "./PostDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PostDetail({ post }) {
  const [upvotes, setUpvotes] = useState(post.upvotes);

  function handleRating() {
    setUpvotes(upvotes + 1);
  }

  return (
    <article className="blog-post">
      <h2 className="blog-post-title">{post.title}</h2>
      <p className="blog-post-date">{post.date}</p>
      <img src="" alt="Blog post" className="blog-post-image" />
      <div className="blog-post-content">{post.content}</div>
      <hr></hr>
      <FontAwesomeIcon
        className="upvoteIcon"
        icon={faThumbsUp}
        onClick={handleRating}
      />
      <span>{upvotes}</span>
    </article>
  );
}
