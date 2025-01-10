import React from 'react';

interface TransportOptionProps {
  icon: React.ReactNode;
  mode: string;
  current: string;
  onChange: (mode: string) => void;
}

export function TransportOption({ icon, mode, current, onChange }: TransportOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(mode)}
      className={`p-4 rounded-lg border-2 ${
        current === mode ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 ${current === mode ? 'text-blue-600' : 'text-gray-600'}`}>
          {icon}
        </div>
        <span className="mt-2 text-sm capitalize">{mode}</span>
      </div>
    </button>
  );
}