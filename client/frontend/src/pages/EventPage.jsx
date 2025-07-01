import React from "react";

export default function EventPage() {
  const events = [
    {
      id: 1,
      title: "Hackathon 2025",
      date: "2025-08-15",
      description: "Join our annual hackathon and build amazing projects!"
    },
    {
      id: 2,
      title: "Tech Talk: AI Trends",
      date: "2025-09-10",
      description: "A talk on the future of AI in software development."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="space-y-4">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white shadow rounded p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-500">{event.date}</p>
            <p className="mt-2">{event.description}</p>
            <button className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
