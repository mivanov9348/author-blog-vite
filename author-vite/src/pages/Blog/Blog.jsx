import AddPost from "../../components/AddPost/AddPost";
import Posts from "../../components/Posts/Posts";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="blog-container">
      <AddPost />
      <hr></hr>
      <h5>Archive:</h5>
      <Posts />
    </div>
  );
}
