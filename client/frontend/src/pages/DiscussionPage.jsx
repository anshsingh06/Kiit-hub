import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionModal from "./QuestionModal";

function DiscussionPage() {
  const [posts, setPosts] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddAnswer = async (postId) => {
    const answerText = answerInputs[postId];
    if (!answerText) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/answers`, {
        text: answerText,
      });
      setAnswerInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (err) {
      console.error("Error adding answer:", err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleDeleteAnswer = async (postId, answerId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${postId}/answers/${answerId}`
      );
      fetchPosts();
    } catch (err) {
      console.error("Error deleting answer:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discussion Forum</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ask Doubts
        </button>
      </div>

      {/* Show modal */}
      {showModal && (
        <QuestionModal
          onClose={() => setShowModal(false)}
          onQuestionCreated={fetchPosts}
        />
      )}

      {/* All posts */}
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mb-2">{post.content}</p>
          <button
            onClick={() => handleDeletePost(post._id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete Doubts
          </button>

          {/* Answers */}
          <div className="mt-4">
            <h3 className="text-lg font-medium">Answers:</h3>
            {post.answers && post.answers.length > 0 ? (
              post.answers.map((ans) => (
                <div key={ans._id} className="border p-2 mt-2 rounded">
                  <p>{ans.text}</p>
                  <button
                    onClick={() => handleDeleteAnswer(post._id, ans._id)}
                    className="text-red-500 text-xs hover:underline mt-1"
                  >
                    Delete Comment
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comment yet.</p>
            )}

            {/* Add Answer */}
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Write an answer..."
                value={answerInputs[post._id] || ""}
                onChange={(e) =>
                  setAnswerInputs((prev) => ({
                    ...prev,
                    [post._id]: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded w-full"
              />
              <button
                onClick={() => handleAddAnswer(post._id)}
                className="bg-black-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DiscussionPage;




