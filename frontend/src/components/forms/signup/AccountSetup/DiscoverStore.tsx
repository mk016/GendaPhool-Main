import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import the icon
import store1 from '../../../../assets/store1.png';
import store2 from '../../../../assets/store2.png';
import store3 from '../../../../assets/store3.png';

// Define the type for a store
interface Store {
  name: string;
  description: string;
  image: string;
}

const DiscoverStore: React.FC = () => {
  // Ensure hooks are called at the top level of the component
  const [selectedStore, setSelectedStore] = useState<number | null>(null); // Specify the type for selectedStore
  const navigate = useNavigate();

  // Define the stores with their properties
  const stores: Store[] = [
    { 
      name: 'Genda Phool Store', 
      description: 'Genda Phool Store', 
      image: store1
    },
    { 
      name: 'Sajawat by Genda Phool', 
      description: 'Sajawat by Genda Phool', 
      image: store2
    },
    { 
      name: 'Bouquets, flowers & leaves', 
      description: 'Bouquets, flowers & leaves', 
      image: store3
    },
  ];

  // Handle store click event
  const handleStoreClick = (index: number) => { // Specify the type for index
    setSelectedStore(index);
    setTimeout(() => {
      navigate('/choose-Flower'); // Corrected the path to match the route in App.jsx
    }, 300); // Delay navigation to allow visual feedback
  };

  // Handle back navigation
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen p-4 sm:p-6"> 
      <div className="max-w-md mx-auto">
        {/* Uncomment to enable back button
        <button onClick={handleGoBack} className="mb-4 flex items-center text-black">
          <FaArrowLeft className="text-xl" />
          <span className="ml-2 hidden sm:inline">Back</span>
        </button>
        */}
    
        <h1 className="text-xl font-semibold mb-4 mt-9">Discover your store</h1>
        <div className="space-y-4">
          {stores.map((store, index) => (
            <div 
              key={index} 
              className={`flex items-center rounded-lg border p-4 cursor-pointer transition-transform transform hover:scale-105 ${
                selectedStore === index ? 'border-green-500 scale-105' : 'border-gray-300'
              }`}
              onClick={() => handleStoreClick(index)}
            >
              {/* Image Container - Left Side */}
              <div className="w-1/3 pr-4">
                <img 
                  src={store.image} 
                  alt={store.name} 
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              
              {/* Content Container - Right Side */}
              <div className="w-2/3">
                <h2 className="text-lg font-semibold">{store.name}</h2>
                <p className="text-gray-600 text-sm">{store.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverStore; 