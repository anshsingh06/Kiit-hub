import React, { useState, useEffect } from "react";
import axios from "axios";

const EventPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });
  const [image, setImage] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch all events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("eventDate", form.eventDate);
      if (image) {
        data.append("image", image);
      }

      await axios.post("http://localhost:5000/api/news", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event created successfully!");
      setForm({ title: "", description: "", eventDate: "" });
      setImage(null);
      fetchEvents(); // Refresh event list
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Create Event
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">All Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            {event.images && event.images.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${event.images[0]}`}
                alt="Event"
                className="mt-2 w-full max-h-64 object-cover rounded"
              />
            )}
            <p className="mt-2">{event.description}</p>
            {event.eventDate && (
              <p className="text-sm text-gray-600">
                Event Date: {new Date(event.eventDate).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;


