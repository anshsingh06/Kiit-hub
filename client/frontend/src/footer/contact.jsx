import React from 'react';

export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Feel free to reach out to the KIIT Hub team for any inquiries or support:
      </p>
      <ul className="text-gray-700 space-y-2">
        <li><strong>Office:</strong> KIIT Campus 15, Bhubaneswar</li>
        <li><strong>Email:</strong> <a href="mailto:kiithub@kiit.ac.in" className="text-blue-600 underline">kiithub@kiit.ac.in</a></li>
        <li><strong>Phone:</strong> +91-XXXXXXXXXX</li>
        <li><strong>Support Hours:</strong> Mon–Fri, 10AM–6PM</li>
      </ul>
    </div>
  );
}
