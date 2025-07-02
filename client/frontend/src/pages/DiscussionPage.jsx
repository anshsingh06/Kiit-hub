import React, { useEffect, useState } from "react";
import axios from "axios";

function DiscussionPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts", {
        title,
        content,
      });
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow p-4 rounded">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mb-2 rounded"
          required
        />
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 mb-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>

      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-1">{post.content}</p>
          <button
            onClick={() => handleDelete(post._id)}
            className="text-red-500 mt-2 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DiscussionPage;
