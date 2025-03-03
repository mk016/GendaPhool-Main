import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface Leaf {
  name: string;
  description: string;
}

const ChooseLeaves: React.FC = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();

  const leaves: Leaf[] = [
    { name: 'Maple', description: 'Beautiful maple leaf' },
    { name: 'Oak', description: 'Sturdy oak leaf' },
    { name: 'Pine', description: 'Evergreen pine leaf' },
    { name: 'Birch', description: 'Graceful birch leaf' },
    { name: 'Willow', description: 'Elegant willow leaf' },
    { name: 'Aspen', description: 'Quaking aspen leaf' },
    { name: 'Palm', description: 'Tropical palm leaf' },
    { name: 'Fern', description: 'Delicate fern leaf' },
    { name: 'Bamboo', description: 'Strong bamboo leaf' },
  ];

  const handleSelect = (index: number): void => {
    const newSelected = selected.includes(index)
      ? selected.filter((i: number) => i !== index)
      : [...selected, index];
    
    setSelected(newSelected);
    
    // Save selected leaves with their details
    const selectedLeaves = newSelected.map(index => ({
      name: leaves[index].name,
      description: leaves[index].description
    }));
    
    localStorage.setItem('selectedLeaves', JSON.stringify(selectedLeaves));
  };

  const handleProceed = (): void => {
    navigate('/choose-garlands');
  };

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
        <div className="mb-2 text-sm text-gray-600 mt-9 text-start font-bitter">Step 2 of 4</div>
        <h1 className="text-2xl font-bold text-start font-bitter">Choose Leaves</h1>
       
        <p className="text-start text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Nunc orci maecenas ut tincidunt a nibh.
        </p>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {leaves.map((leaf, index) => (
            <button
              key={index}
              className={`border rounded-lg p-4 hover:border-black ${
                selected.includes(index) ? 'bg-green-500 text-white' : 'border-gray-300'
              }`}
              onClick={() => handleSelect(index)}
            >
              <h2 className="font-bold">{leaf.name}</h2>
              <p className="text-gray-600">{leaf.description}</p>
            </button>
          ))}
        </div>
        
        <button
          onClick={handleProceed}
          className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Select & Proceed
        </button>
      </div>
    </div>
  );
};

export default ChooseLeaves; 