import React, { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "./EventModal";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 pt-18">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow p-4 rounded relative">
            {event.images && event.images.length > 0 && (
              <img
                src={`http://localhost:5000/uploads/${event.images[0]}`}
                alt="Event"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            {event.eventDate && (
              <p className="text-sm text-gray-500 mt-2">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={() => handleDelete(event._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <EventModal onClose={() => setShowModal(false)} onEventCreated={fetchEvents} />
      )}
    </div>
  );
}




