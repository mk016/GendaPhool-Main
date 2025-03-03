import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Define the type for a garland
interface Garland {
  name: string;
  description: string;
}

const ChooseGarlands: React.FC = () => {
  const navigate = useNavigate();
  // State for selected garland indices with proper typing
  const [selected, setSelected] = useState<number[]>([]);

  // Define garland data
  const garlands: Garland[] = [
    { name: 'Rose Garland', description: 'Beautiful rose garland' },
    { name: 'Marigold Garland', description: 'Vibrant marigold garland' },
    { name: 'Jasmine Garland', description: 'Fragrant jasmine garland' },
    { name: 'Lily Garland', description: 'Elegant lily garland' },
    { name: 'Orchid Garland', description: 'Exotic orchid garland' },
    { name: 'Carnation Garland', description: 'Lovely carnation garland' },
    { name: 'Tulip Garland', description: 'Charming tulip garland' },
    { name: 'Sunflower Garland', description: 'Bright sunflower garland' },
    { name: 'Daisy Garland', description: 'Charming daisy garland' },
  ];

  // Handle garland selection/deselection
  const handleSelect = (index: number): void => {
    const newSelected = selected.includes(index)
      ? selected.filter((i: number) => i !== index)
      : [...selected, index];
    
    setSelected(newSelected);
    
    // Save selected garlands with their details
    const selectedGarlands = newSelected.map(index => ({
      name: garlands[index].name,
      description: garlands[index].description
    }));
    
    localStorage.setItem('selectedGarlands', JSON.stringify(selectedGarlands));
  };

  // Handle back navigation
  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-md mx-auto space-y-6">
        <button onClick={handleGoBack} className="mb-4 flex items-center text-black">
          <FaArrowLeft className="text-xl" />
          <span className="ml-2 hidden sm:inline">Back</span>
        </button>
        <div className="mb-2 text-sm text-gray-600 mt-9 text-start font-bitter">Step 3 of 4</div>
        <h1 className="text-2xl font-bold text-start font-bitter">Choose Garlands</h1>
        
        <p className="text-start text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Nunc orci maecenas ut tincidunt a nibh.
        </p>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {garlands.map((garland, index) => (
            <button
              key={index}
              className={`border rounded-lg p-4 hover:border-black ${
                selected.includes(index) ? 'bg-green-500 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleSelect(index)}
            >
              <h2 className="font-bold">{garland.name}</h2>
              <p className="text-gray-600">{garland.description}</p>
            </button>
          ))}
        </div>
        <Link to="/your-package">
          <button className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700">
            Select & Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChooseGarlands; 