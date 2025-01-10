import React from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';

export type TrackingStatus = 'completed' | 'current' | 'pending';

interface TrackingStepProps {
  title: string;
  location: string;
  time: string;
  status: TrackingStatus;
}

export function TrackingStep({ title, location, time, status }: TrackingStepProps) {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'pending':
        return <Package className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-start">
      <div className="mr-4">{getIcon()}</div>
      <div className="flex-1">
        <h3 className={`font-semibold ${
          status === 'pending' ? 'text-gray-400' : 'text-gray-800'
        }`}>{title}</h3>
        <p className={status === 'pending' ? 'text-gray-400' : 'text-gray-600'}>
          {location}
        </p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}