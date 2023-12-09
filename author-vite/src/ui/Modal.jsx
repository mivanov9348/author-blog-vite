import React from "react";
import "./Modal.css"; // Ensure you have CSS for styling the modal

export default function Modal({ onClose, onSubmit }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <textarea name="blogContent" />
          <button type="submit">Post Blog</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
