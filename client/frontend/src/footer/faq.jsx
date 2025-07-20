import React from 'react';

export default function FAQs() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Academic FAQs</h1>
      <div className="text-gray-700 space-y-4">
        <div>
          <strong>Q:</strong> How do I apply for revaluation?<br />
          <strong>A:</strong> Go to the KIIT student portal → Academics → Revaluation section.
        </div>
        <div>
          <strong>Q:</strong> Where can I find the syllabus?<br />
          <strong>A:</strong> Check the Resources section or your department portal.
        </div>
        <div>
          <strong>Q:</strong> How do I check internal marks?<br />
          <strong>A:</strong> Login to the ERP portal and navigate to Academic Performance.
        </div>
      </div>
    </div>
  );
}
