import React from 'react';

export default function Clubs() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Clubs & Societies</h1>
      <p className="text-gray-700 mb-4">
        Get involved in student-run clubs to enhance your college life and network:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong>Technical:</strong> GDSC, Robotics, KIIT Coders</li>
        <li><strong>Cultural:</strong> Music Club, Dance Crew, Drama Society</li>
        <li><strong>Literary:</strong> Kairos, Literary Society</li>
        <li><strong>Social Impact:</strong> NSS, Enactus</li>
        <li><strong>Sports:</strong> Cricket, Basketball, Athletics</li>
      </ul>
    </div>
  );
}
