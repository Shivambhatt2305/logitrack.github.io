import React from 'react';
import { Truck } from 'lucide-react';

export function Welcome({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center">
        <Truck className="w-16 h-16 mx-auto text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to FastTrack</h1>
        <p className="text-gray-600 mb-8">Your trusted partner in global logistics and shipping</p>
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}