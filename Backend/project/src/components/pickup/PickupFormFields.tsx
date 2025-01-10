import React from 'react';
import { FormField } from './FormField';

interface FormData {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  idProof: string;
  itemDescription: string;
}

interface PickupFormFieldsProps {
  formData: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}

export function PickupFormFields({ formData, onChange }: PickupFormFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(value) => onChange('name', value)}
      />
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => onChange('email', value)}
      />
      <FormField
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(value) => onChange('phone', value)}
      />
      <FormField
        label="Pickup Address"
        type="text"
        value={formData.pickupAddress}
        onChange={(value) => onChange('pickupAddress', value)}
      />
      <FormField
        label="Delivery Address"
        type="text"
        value={formData.deliveryAddress}
        onChange={(value) => onChange('deliveryAddress', value)}
      />
      <FormField
        label="ID Proof Number"
        type="text"
        value={formData.idProof}
        onChange={(value) => onChange('idProof', value)}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Item Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={formData.itemDescription}
          onChange={(e) => onChange('itemDescription', e.target.value)}
        />
      </div>
    </div>
  );
}