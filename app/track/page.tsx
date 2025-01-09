// 'use client';

// import { useState } from 'react';

// export default function WelcomePage() {
//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');
//   const [mapHtml, setMapHtml] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleTrackRoute = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage(null);
//     setMapHtml(null);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/calculate_route', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ start: startLocation, end: endLocation }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to fetch route');
//       }

//       setMapHtml(data.map_html);
//     } catch (error: any) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Track Your Route</h1>
//       <form onSubmit={handleTrackRoute}>
//         <input
//           type="text"
//           placeholder="Start Location"
//           value={startLocation}
//           onChange={(e) => setStartLocation(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="End Location"
//           value={endLocation}
//           onChange={(e) => setEndLocation(e.target.value)}
//         />
//         <button type="submit">Track Route</button>
//       </form>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       {mapHtml && <div dangerouslySetInnerHTML={{ __html: mapHtml }} />}
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import TrackingTimeline from '../../components/TrackingTimeline';
import Logo from '../../components/Logo';

export default function WelcomePage() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [mapHtml, setMapHtml] = useState<string | null>('<div style="width:100%; height:400px; background-color:lightgray; display:flex; justify-content:center; align-items:center;">Default Map Display</div>');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [liveStatus, setLiveStatus] = useState<string | null>('Fetching live updates...');
  const [statusUpdates, setStatusUpdates] = useState<string[]>([]);

  const handleTrackRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setMapHtml(null);

    try {
      const response = await fetch('http://127.0.0.1:3000/calculate_route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: startLocation, end: endLocation }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch route');
      }

      setMapHtml(data.map_html);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleTrackPackage = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingData({
      status: 'In Transit',
      location: 'Chicago, IL',
      estimatedDelivery: '2023-06-15',
      timeline: [
        { status: 'Order Placed', date: '2023-06-10', completed: true },
        { status: 'Picked Up', date: '2023-06-11', completed: true },
        { status: 'In Transit', date: '2023-06-12', completed: false },
        { status: 'Out for Delivery', date: '2023-06-15', completed: false },
        { status: 'Delivered', date: '', completed: false },
      ],
    });

    setStatusUpdates([]);
    setLiveStatus('Fetching live updates...');
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (trackingData) {
      interval = setInterval(() => {
        const updates = [
          'Package scanned in Chicago, IL',
          'Departed Chicago hub',
          'Arrived in Denver, CO',
          'Out for delivery',
          'Delivered successfully!',
        ];
        setStatusUpdates((prev) => {
          if (prev.length < updates.length) {
            return [...prev, updates[prev.length]];
          } else {
            clearInterval(interval);
            setLiveStatus('All updates received');
            return prev;
          }
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [trackingData]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Responsive Header */}
      <header className="bg-blue-200/50 text-white py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Link href="/options" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl text-blue-600 font-bold">Track Your Details</h1>
        <Logo />
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Route Tracking Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Track Your Route</h2>
          <form onSubmit={handleTrackRoute} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Start Location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="End Location"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Track Route
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          {mapHtml && (
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
            </div>
          )}
        </section>

        {/* Package Tracking Section */}
        <section className="space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Track Your Package</h2>
          <motion.form
            onSubmit={handleTrackPackage}
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-2 rounded-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.form>

          <AnimatePresence>
            {trackingData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6"
              >
                <TrackingTimeline data={trackingData} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Status Updates Section */}
          <section className="mt-6 sm:mt-8">
            <h3 className="text-lg font-semibold mb-4">Live Status Updates</h3>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 space-y-2">
              {statusUpdates.map((update, index) => (
                <motion.p
                  key={index}
                  className="text-blue-700 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {update}
                </motion.p>
              ))}
              {liveStatus && (
                <p className="text-sm text-gray-500 mt-2">{liveStatus}</p>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
