import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { TrackingStep } from './TrackingStep';

interface TrackingDetailsProps {
  trackingId: string;
}

export function TrackingDetails({ trackingId }: TrackingDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tracking Details</h2>
        <span className="text-sm text-gray-500">ID: {trackingId}</span>
      </div>

      <div className="space-y-8">
        <TrackingStep
          title="Package Picked Up"
          location="New York Warehouse"
          time="2024-02-28 09:30 AM"
          status="completed"
        />
        <TrackingStep
          title="In Transit"
          location="Chicago Distribution Center"
          time="2024-02-28 04:45 PM"
          status="completed"
        />
        <TrackingStep
          title="Out for Delivery"
          location="Los Angeles"
          time="2024-02-29 08:15 AM"
          status="current"
        />
        <TrackingStep
          title="Delivered"
          location="Final Destination"
          time="Estimated: 2024-02-29 02:00 PM"
          status="pending"
        />
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <span className="text-yellow-700">Slight delay due to weather conditions</span>
        </div>
      </div>
    </div>
  );
}