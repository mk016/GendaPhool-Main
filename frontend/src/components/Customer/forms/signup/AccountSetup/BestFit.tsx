import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Define the type for a package
interface Package {
  id: number;
  flowers: { placeholder: boolean };
  leaves: { placeholder: boolean };
  garlands: { placeholder: boolean };
}

const BestFit: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = (): void => {
    navigate(-1);
  };

  const packages: Package[] = [
    {
      id: 1,
      flowers: { placeholder: true },
      leaves: { placeholder: true },
      garlands: { placeholder: true }
    },
    {
      id: 2,
      flowers: { placeholder: true },
      leaves: { placeholder: true },
      garlands: { placeholder: true }
    },
    {
      id: 3,
      flowers: { placeholder: true },
      leaves: { placeholder: true },
      garlands: { placeholder: true }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <button onClick={handleBack} className="flex items-center text-black">
              <FaArrowLeft className="text-xl" />
              <span className="ml-2 hidden sm:inline">Back</span>
            </button>
          </div>
          <div className="text-sm text-gray-600 mt-4 text-start font-bitter">Step 1 of 4</div>
          <h1 className="text-2xl font-bold text-start mt-4 font-bitter">
            Best fit as per your selected options,
            Choose one
          </h1>
        </div>
      </header>

      {/* Package Options */}
      <div className="p-4 space-y-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className="border border-gray-200 rounded-2xl p-4 hover:border-green-600 cursor-pointer"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Flowers</p>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Leaves</p>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Garlands</p>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
                <div className="bg-gray-100 h-24 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto space-y-4">
          <Link 
            to="/explore-packages"
            className="block text-center text-green-800 hover:underline"
          >
            Explore More Packages
          </Link>
          
          <button 
            onClick={() => navigate('/setup-location')}
            className="w-full bg-green-800 text-white py-4 rounded-lg font-medium"
          >
            Confirm & Save
          </button>
        </div>
      </div>

      {/* Add padding at bottom to account for fixed bottom section */}
      <div className="h-32"></div>
    </div>
  );
};

export default BestFit;
