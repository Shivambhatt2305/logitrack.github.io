import React from 'react';
import { Plane, Train, Ship, Truck } from 'lucide-react';
import { BackButton } from './BackButton';

export function Information({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ServiceCard
            icon={<Plane className="w-8 h-8 text-blue-600" />}
            title="Air Freight"
            description="Fast and reliable air transportation worldwide"
          />
          <ServiceCard
            icon={<Train className="w-8 h-8 text-blue-600" />}
            title="Rail Transport"
            description="Efficient rail freight services across continents"
          />
          <ServiceCard
            icon={<Ship className="w-8 h-8 text-blue-600" />}
            title="Ocean Freight"
            description="Cost-effective sea shipping solutions"
          />
          <ServiceCard
            icon={<Truck className="w-8 h-8 text-blue-600" />}
            title="Road Transport"
            description="Flexible road delivery options"
          />
        </div>

        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-auto block"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}