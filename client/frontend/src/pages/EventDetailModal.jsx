import React, { useRef } from "react";
// import axios from "axios";

function EventDetailModal({ event, onClose }) {
  const modalRef = useRef();
  

  const closeModal = (e) => {
    if (modalRef.current=== e.target) {
      onClose();
    }
  }
 return (
    <div  ref={modalRef} onClick={closeModal} className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="mb-4">{event.description}</p>
        {event.images && event.images.length > 0 && (
          <img
            src={`http://localhost:5000/uploads/${event.images[0]}`}
            alt="Event"
            className="rounded mb-4"
          />
        )}
        {event.createdAt && (
          <p className="text-sm text-gray-500">
            Posted on: {new Date(event.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default EventDetailModal;
