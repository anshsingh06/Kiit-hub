import React from 'react';

export default function Placements() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Placement Resources</h1>
      <p className="text-gray-700 mb-4">
        Explore everything you need to ace your campus placements:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Upcoming placement drive notifications</li>
        <li>Resume and LinkedIn building tips</li>
        <li>Mock interview resources and aptitude tests</li>
        <li>Previous years' placement stats and company experiences</li>
      </ul>
    </div>
  );
}
