import React, { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "./EventModal";
import EventDetailModal from "./EventDetailModal";


export default function EventPage() {
  const [events, setEvents] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [deletingEventId, setDeletingEventId] = useState(null);
   const [deleteError, setDeleteError] = useState('');

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
    const event = events.find((item) => item._id === id);
    if (!window.confirm(`Delete "${event?.title || 'this event'}"? This cannot be undone.`)) {
      return;
    }

    let token;
    try {
      token = JSON.parse(localStorage.getItem('kiit-connect-auth') || 'null')?.token;
    } catch {
      setDeleteError('Your saved sign-in could not be read. Please sign in again and retry.');
      return;
    }

    if (!token) {
      setDeleteError('Please sign up or sign in before deleting an event.');
      return;
    }

    setDeleteError('');
    setDeletingEventId(id);
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((currentEvents) => currentEvents.filter((item) => item._id !== id));
      setSelectedEvent((currentEvent) => currentEvent?._id === id ? null : currentEvent);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setDeleteError('Your sign-in may have expired. Please sign in again and retry.');
      } else {
        setDeleteError(err.response?.data?.message || 'Could not delete the event. Please try again.');
      }
    } finally {
      setDeletingEventId(null);
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

      {deleteError && (
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {deleteError}
        </p>
      )}

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
            <p className="text-gray-700">{(event.description || '').slice(0, 100)}</p>
            {event.eventDate && (
              <p className="text-sm text-gray-500 mt-2">
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            
            )}
              <button
            onClick={() => setSelectedEvent(event)}
            className="text-blue-500 hover:underline mt-2"
          >
            See More
          </button>
            <button
              onClick={() => handleDelete(event._id)}
              className="absolute top-2 right-2 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-red-600 shadow hover:bg-red-50 hover:text-red-800 disabled:cursor-wait disabled:opacity-60"
              disabled={deletingEventId === event._id}
              type="button"
            >
              {deletingEventId === event._id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {showModal && (
        <EventModal onClose={() => setShowModal(false)} onEventCreated={fetchEvents} />
      )}
    </div>


  );
}


