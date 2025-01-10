import React from 'react';
import { Plane, Train, Ship, Truck } from 'lucide-react';
import { TransportOption } from './TransportOption';

interface TransportModesProps {
  current: string;
  onChange: (mode: string) => void;
}

export function TransportModes({ current, onChange }: TransportModesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <TransportOption icon={<Plane />} mode="air" current={current} onChange={onChange} />
      <TransportOption icon={<Train />} mode="train" current={current} onChange={onChange} />
      <TransportOption icon={<Ship />} mode="ship" current={current} onChange={onChange} />
      <TransportOption icon={<Truck />} mode="road" current={current} onChange={onChange} />
    </div>
  );
}