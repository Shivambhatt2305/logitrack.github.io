import React from 'react';

interface TrackingFormProps {
  trackingId: string;
  onTrackingIdChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TrackingForm({ trackingId, onTrackingIdChange, onSubmit }: TrackingFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Track Your Package</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tracking Number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={trackingId}
            onChange={(e) => onTrackingIdChange(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Track Package
        </button>
      </form>
    </div>
  );
}