import "./TextArea.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextArea() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="text-container">
      <ReactQuill value={text} onChange={handleChange} />
    </div>
  );
}
