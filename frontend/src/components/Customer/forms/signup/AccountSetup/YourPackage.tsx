import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Define interfaces for the selected items
interface Item {
  name: string;
  description: string;
}

interface SelectedItems {
  flowers: Item[];
  leaves: Item[];
  garlands: Item[];
}

const YourPackage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    flowers: [],
    leaves: [],
    garlands: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Get selected items from localStorage or state management
    const flowers: Item[] = JSON.parse(localStorage.getItem('selectedFlowers') || '[]');
    const leaves: Item[] = JSON.parse(localStorage.getItem('selectedLeaves') || '[]');
    const garlands: Item[] = JSON.parse(localStorage.getItem('selectedGarlands') || '[]');
    
    setSelectedItems({
      flowers,
      leaves,
      garlands
    });
  }, []);

  const handleConfirmAndSave = (): void => {
    navigate('/Best-fit');
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
        <div className="mb-2 text-sm text-gray-600 mt-9 text-start font-bitter">Step 4 of 4</div>
        <h1 className="text-2xl font-bold text-start font-bitter">Here is your package</h1>
        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
          <div>
            <h2 className="font-bold">Flowers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 p-2 rounded-md">
              {selectedItems.flowers.map((flower, index) => (
                <div 
                  key={index} 
                  className="bg-white p-2 rounded-md border border-gray-300"
                >
                  <h3 className="text-sm font-semibold">{flower.name}</h3>
                  <p className="text-xs text-gray-600">{flower.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-bold">Leaves</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 p-2 rounded-md">
              {selectedItems.leaves.map((leaf, index) => (
                <div 
                  key={index} 
                  className="bg-white p-2 rounded-md border border-gray-300"
                >
                  <h3 className="text-sm font-semibold">{leaf.name}</h3>
                  <p className="text-xs text-gray-600">{leaf.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-bold">Garlands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-100 p-2 rounded-md">
              {selectedItems.garlands.map((garland, index) => (
                <div 
                  key={index} 
                  className="bg-white p-2 rounded-md border border-gray-300"
                >
                  <h3 className="text-sm font-semibold">{garland.name}</h3>
                  <p className="text-xs text-gray-600">{garland.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">Want to name your package?</p>
          <input
            type="text"
            placeholder="Name your package"
            className="w-full border border-gray-300 rounded-lg p-2 "
          />
          <Link to="/explore-more" className="text-green-800 underline text-end">
            Explore More Packages
          </Link>
        </div>
        
        <button 
          onClick={handleConfirmAndSave}
          className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Confirm & Save
        </button>
      </div>
    </div>
  );
};

export default YourPackage; 