import React from 'react';

export default function Support() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="text-gray-700 mb-4">
        Facing issues or have suggestions? We're here to help!
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Email us at <a href="mailto:support@kiithub.ac.in" className="text-blue-600 underline">support@kiithub.ac.in</a></li>
        <li>Post your query in the Discussions section for peer support.</li>
        <li>Use our feedback form to report bugs or request features.</li>
      </ul>
    </div>
  );
}
