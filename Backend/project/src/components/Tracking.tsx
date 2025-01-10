import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { TrackingForm } from './tracking/TrackingForm';
import { TrackingDetails } from './tracking/TrackingDetails';

export function Tracking({ onBack }: { onBack: () => void }) {
  const [trackingId, setTrackingId] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-2xl mx-auto">
        {!showDetails ? (
          <TrackingForm
            trackingId={trackingId}
            onTrackingIdChange={setTrackingId}
            onSubmit={handleTrack}
          />
        ) : (
          <TrackingDetails trackingId={trackingId} />
        )}
      </div>
    </div>
  );
}