import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddPost.css"; // Ensure this is correctly imported

export default function AddPost() {
  const [content, setContent] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],

        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );

  return (
    <div className="text-container">
      <div className="title-container">
        <input type="text" placeholder="Add A Title..." />
      </div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Add some text..."
      />
      <button className="saveBtn">Save</button>
    </div>
  );
}
