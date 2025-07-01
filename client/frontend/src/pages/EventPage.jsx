// src/components/EventPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });

  // Fetch all NewsEvents and filter only events (where eventDate is set)
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      const onlyEvents = res.data.filter((item) => item.eventDate);
      setEvents(onlyEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post to /api/news since you are reusing NewsEvent
      const res = await axios.post("http://localhost:5000/api/news", form);
      console.log("Event created:", res.data);
      setForm({ title: "", description: "", eventDate: "" });
      fetchEvents(); // refresh list
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. See console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            {event.eventDate && (
              <p className="text-sm text-gray-500 mt-2">
                Event Date: {new Date(event.eventDate).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-600">No events yet.</p>
        )}
      </div>
    </div>
  );
}

