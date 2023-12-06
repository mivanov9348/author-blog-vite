import TextArea from "../../components/TextArea/TextArea";
import Posts from "../../components/Posts/Posts";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="blog-container">
      <TextArea />
      <Posts />
    </div>
  );
}
