import React, { useRef, useState } from "react";
import axios from "axios";

function QuestionModal({ onClose, onQuestionCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current=== e.target) {
      onClose();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
      });
      onQuestionCreated(); // Refresh questions
      onClose(); // Close modal
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  return (
    <div ref={modalRef} onClick={closeModal}className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 mb-2 rounded"
            required
          />
          <textarea
            placeholder="Add details..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2 mb-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionModal;
