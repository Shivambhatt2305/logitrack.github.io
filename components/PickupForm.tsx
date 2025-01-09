// "use client"

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { Upload } from 'lucide-react'

// interface PickupFormProps {
//   selectedMode: string | null
// }

// export default function PickupForm({ selectedMode }: PickupFormProps) {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     pickupAddress: '',
//     deliveryAddress: '',
//     idProof: '',
//     itemDescription: '',
//   })
//   const [currentStep, setCurrentStep] = useState(0)
//   const [fileName, setFileName] = useState('')

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target as HTMLInputElement
//     if (type === 'file') {
//       const file = (e.target as HTMLInputElement).files?.[0]
//       setFileName(file ? file.name : '')
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Form submitted:', { ...formData, transportMode: selectedMode })
//     router.push('/pickup/success')
//   }

//   const formSteps = [
//     [
//       { name: 'name', label: 'Full Name', type: 'text', required: true },
//       { name: 'email', label: 'Email', type: 'email', required: true },
//       { name: 'phone', label: 'Phone', type: 'tel', required: true },
//     ],
//     [
//       { name: 'pickupAddress', label: 'Pickup Address', type: 'text', required: true },
//       { name: 'deliveryAddress', label: 'Delivery Address', type: 'text', required: true },
//     ],
//     [
//       { name: 'idProof', label: 'ID Proof (PDF only)', type: 'file', accept: ".pdf", required: true },
//       { name: 'itemDescription', label: 'Item Description', type: 'text', required: true },
//     ],
//   ]

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-4 sm:p-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Step Indicator */}
//       <div className="mb-4 sm:mb-6">
//         <div className="flex justify-between mb-2">
//           {formSteps.map((_, index) => (
//             <motion.div
//               key={index}
//               className={`h-1.5 sm:h-2 w-full mx-0.5 sm:mx-1 rounded ${
//                 index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
//               }`}
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: index <= currentStep ? 1 : 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             />
//           ))}
//         </div>
//         <p className="text-center text-xs sm:text-sm text-blue-700">
//           Step {currentStep + 1} of {formSteps.length}
//         </p>
//       </div>

//       {/* Form Fields */}
//       <motion.div
//         key={currentStep}
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -20 }}
//         transition={{ duration: 0.3 }}
//       >
//         {formSteps[currentStep].map((field) => (
//           <div key={field.name} className="mb-3 sm:mb-4">
//             <label htmlFor={field.name} className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">
//               {field.label}
//             </label>
//             {field.type === 'file' ? (
//               <div className="relative">
//                 <motion.div
//                   className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.99 }}
//                 >
//                   <input
//                     type="file"
//                     id={field.name}
//                     name={field.name}
//                     onChange={handleChange}
//                     required={field.required}
//                     accept={field.accept}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <div className="flex items-center justify-center text-blue-600">
//                     <motion.div
//                       animate={{ y: [0, -3, 0] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
//                     </motion.div>
//                     <span className="text-xs sm:text-sm">
//                       {fileName || 'Choose a file...'}
//                     </span>
//                   </div>
//                 </motion.div>
//               </div>
//             ) : (
//               <input
//                 type={field.type}
//                 id={field.name}
//                 name={field.name}
//                 value={formData[field.name as keyof typeof formData]}
//                 onChange={handleChange}
//                 required={field.required}
//                 className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-900 text-sm sm:text-base"
//               />
//             )}
//           </div>
//         ))}
//       </motion.div>

//       {/* Navigation Buttons */}
//       <div className="mt-4 sm:mt-6 flex justify-between">
//         {currentStep > 0 && (
//           <motion.button
//             type="button"
//             onClick={() => setCurrentStep((prev) => prev - 1)}
//             className="bg-gray-200 text-blue-700 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Previous
//           </motion.button>
//         )}
//         {currentStep < formSteps.length - 1 ? (
//           <motion.button
//             type="button"
//             onClick={() => setCurrentStep((prev) => prev + 1)}
//             className="bg-blue-500 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Next
//           </motion.button>
//         ) : (
//           <motion.button
//             type="submit"
//             disabled={!selectedMode}
//             className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1.5 sm:py-2 px-6 sm:px-15 rounded-md text-sm sm:text-base font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Schedule Pickup
//           </motion.button>
//         )}
//       </div>
//     </motion.form>
//   )
// }

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface PickupFormProps {
  selectedMode: string | null
}

export default function PickupForm({ selectedMode }: PickupFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    idProof: '',
    itemDescription: '',
  });
  const [currentStep, setCurrentStep] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log('Form submitted:', { ...formData, transportMode: selectedMode })
  //   router.push('/pickup/success')
  // }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault(); // Prevent the default form submission behavior.
    
    //   try {
    //     const response = await fetch('http://localhost:5000/submit', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData), // Send formData to the backend as JSON.
    //     });
    
    //     if (response.ok) {
    //       console.log('Data submitted successfully');
    //     } else {
    //       console.error('Submission failed:', await response.json());
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const response = await fetch('http://127.0.0.1:3000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            selectedMode, // Include selected transport mode
          }),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          console.log('Data submitted successfully:', responseData);
          alert('Pickup scheduled successfully!');
          router.push('/pickup/success'); // Navigate to success page if needed
        } else {
          const errorData = await response.json();
          console.error('Submission failed:', errorData);
          alert('Error scheduling pickup.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
      }
    };
    
    
  


  const formSteps = [
    [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
    ],
    [
      { name: 'pickupAddress', label: 'Pickup Address', type: 'text', required: true },
      { name: 'deliveryAddress', label: 'Delivery Address', type: 'text', required: true },
    ],
    [
      { name: 'idProof', label: 'ID Proof (PDF only)', type: 'file', accept: ".pdf", required: true },
      { name: 'itemDescription', label: 'Item Description', type: 'text', required: true },
    ],
  ]

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-sm rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {formSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-full mx-1 rounded ${
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index <= currentStep ? 1 : 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>
        <p className="text-center text-sm text-blue-700">
          Step {currentStep + 1} of {formSteps.length}
        </p>
      </div>

      {/* Form Fields */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {formSteps[currentStep].map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-blue-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                required={field.required}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-900"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={field.type !== 'file' ? formData[field.name as keyof typeof formData] : undefined}
                onChange={handleChange}
                required={field.required}
                accept={field.type === 'file' ? field.accept : undefined}
                className="w-full px-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-900"
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {currentStep > 0 && (
          <motion.button
            type="button"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="bg-gray-200 text-blue-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        )}
        {currentStep < formSteps.length - 1 ? (
          <motion.button
            type="button"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-20 rounded-md font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Pickup
          </motion.button>
        )}
      </div>
    </motion.form>
  )
}