import React, { useState } from 'react';
import { Welcome } from './components/Welcome';
import { Information } from './components/Information';
import { Options } from './components/Options';
import { PickupForm } from './components/PickupForm';
import { Tracking } from './components/Tracking';

type Step = 'welcome' | 'info' | 'options' | 'pickup' | 'tracking';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');

  const handleBack = () => {
    switch (currentStep) {
      case 'info':
        setCurrentStep('welcome');
        break;
      case 'options':
        setCurrentStep('info');
        break;
      case 'pickup':
      case 'tracking':
        setCurrentStep('options');
        break;
    }
  };

  const handlePickupSubmit = (data: any) => {
    console.log('Pickup data:', data);
    setCurrentStep('tracking');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <Welcome onContinue={() => setCurrentStep('info')} />;
      case 'info':
        return <Information onContinue={() => setCurrentStep('options')} onBack={handleBack} />;
      case 'options':
        return (
          <Options
            onPickup={() => setCurrentStep('pickup')}
            onTrack={() => setCurrentStep('tracking')}
            onBack={handleBack}
          />
        );
      case 'pickup':
        return <PickupForm onSubmit={handlePickupSubmit} onBack={handleBack} />;
      case 'tracking':
        return <Tracking onBack={handleBack} />;
      default:
        return <Welcome onContinue={() => setCurrentStep('info')} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderStep()}</div>;
}

export default App;