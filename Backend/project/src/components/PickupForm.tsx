import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { TransportModes } from './pickup/TransportModes';
import { PickupFormFields } from './pickup/PickupFormFields';

interface FormData {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  idProof: string;
  itemDescription: string;
}

export function PickupForm({ onSubmit, onBack }: { 
  onSubmit: (data: any) => void;
  onBack: () => void;
}) {
  const [transportMode, setTransportMode] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    idProof: '',
    itemDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, transportMode });
  };

  const handleFormChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Schedule Pickup</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TransportModes current={transportMode} onChange={setTransportMode} />
          <PickupFormFields formData={formData} onChange={handleFormChange} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule Pickup
          </button>
        </form>
      </div>
    </div>
  );
}