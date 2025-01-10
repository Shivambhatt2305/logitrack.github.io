import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
}