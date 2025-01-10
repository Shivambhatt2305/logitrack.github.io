import React from 'react';
import { Package, Search } from 'lucide-react';
import { BackButton } from './BackButton';

export function Options({ onPickup, onTrack, onBack }: { 
  onPickup: () => void; 
  onTrack: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What would you like to do?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={onPickup}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow text-center"
          >
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Schedule Pickup</h3>
            <p className="text-gray-600">Book a new shipment pickup</p>
          </button>

          <button
            onClick={onTrack}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow text-center"
          >
            <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Track Package</h3>
            <p className="text-gray-600">Track your existing shipment</p>
          </button>
        </div>
      </div>
    </div>
  );
}