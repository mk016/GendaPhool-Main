import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Define interfaces for type safety
interface Flower {
  name: string;
  description: string;
}

interface ChooseFlowerProps {
  currentStep: number;
}

const ChooseFlower: React.FC<ChooseFlowerProps> = ({ currentStep }) => {
  // State for selected flower indices with proper typing
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  // Define flower data
  const flowers: Flower[] = [
    { name: 'Rose', description: 'Beautiful red rose' },
    { name: 'Tulip', description: 'Elegant tulip' },
    { name: 'Sunflower', description: 'Bright sunflower' },
    { name: 'Daisy', description: 'Charming daisy' },
    { name: 'Lily', description: 'Fragrant lily' },
    { name: 'Orchid', description: 'Exotic orchid' },
    { name: 'Carnation', description: 'Lovely carnation' },
    { name: 'Lavender', description: 'Soothing lavender' },
    { name: 'Marigold', description: 'Vibrant marigold' },
    { name: 'Dahlia', description: 'Dahlia' },
  ];

  // Load previously selected flowers when component mounts
  useEffect(() => {
    const savedFlowers = JSON.parse(localStorage.getItem('selectedFlowers') || '[]') as Flower[];
    // Convert saved flowers back to indices
    const savedIndices = savedFlowers.map((savedFlower: Flower) => 
      flowers.findIndex(flower => flower.name === savedFlower.name)
    ).filter((index: number) => index !== -1);
    
    setSelected(savedIndices);
  }, []);

  // Handle flower selection/deselection
  const handleSelect = (index: number): void => {
    const newSelected = selected.includes(index)
      ? selected.filter((i: number) => i !== index)
      : [...selected, index];
    
    setSelected(newSelected);
    
    // Save selected flowers with their details
    const selectedFlowers = newSelected.map(index => ({
      name: flowers[index].name,
      description: flowers[index].description
    }));
    
    localStorage.setItem('selectedFlowers', JSON.stringify(selectedFlowers));
  };

  // Handle back navigation
  const handleGoBack = (): void => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white p-4 sm:p-6">
      <div className="flex-grow max-w-md mx-auto space-y-6">
        <button onClick={handleGoBack} className="mb-4 flex items-center text-black">
          <FaArrowLeft className="text-xl" />
          <span className="ml-2 hidden sm:inline">Back</span>
        </button>
        <div className="mb-2 text-sm text-gray-600 mt-9 text-start font-bitter">Step 1 of 4</div>
        <h1 className="text-2xl font-bold text-start  font-bitter">Choose Flowers</h1>
      
        <p className="text-start text-gray-600 font-bitter">
          Lorem ipsum dolor sit amet consectetur. Nunc orci maecenas ut tincidunt a nibh.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {flowers.map((flower, index) => (
            <button
              key={index}
              className={`border rounded-lg p-4 hover:border-black font-bitter ${
                selected.includes(index) ? 'bg-green-600 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleSelect(index)}
            >
              <h2 className="font-bold">{flower.name}</h2>
              <p className="text-gray-600">{flower.description}</p>
            </button>
          ))}
        </div>
        <Link to="/choose-leaves">
          <button className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 font-bitter">
            Select & Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChooseFlower;