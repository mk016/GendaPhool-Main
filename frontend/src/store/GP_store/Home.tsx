import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

function Home() {
  const navigate = useNavigate();
  const { switchStore } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Store Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Genda_Phool_Store</h1>
          <p className="text-sm text-gray-600">5:00am to 8:30pm</p>
        </div>
        <div 
          className="bg-yellow-100 px-3 py-1 rounded-full cursor-pointer hover:bg-yellow-200"
          onClick={() => {
            switchStore('GP_daily');
            navigate('/');
          }}
        >
          <span className="text-sm text-yellow-800">GP Store</span>
        </div>
      </div>

      {/* Promotional Slides */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-lg h-48 md:h-64 w-full">
          <p className="text-center py-20">Promotional slides</p>
        </div>
      </div>

      {/* Order Again Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Again</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg p-2">
              <div className="bg-gray-200 rounded-lg h-24 mb-2"></div>
              <p className="text-sm text-center">Flower {item.toString().padStart(2, '0')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deals of the day */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Deals of the day</h2>
          <Link to="/deals" className="text-sm text-green-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg p-2">
              <div className="bg-gray-200 rounded-lg h-32 mb-2"></div>
              <p className="text-sm text-center">Flower {item.toString().padStart(2, '0')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exotic Flowers & Bouquets */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Exotic Flowers & Bouquets</h2>
          <Link to="/exotic" className="text-sm text-green-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg p-2">
              <div className="bg-gray-200 rounded-lg h-40 mb-2"></div>
              <p className="text-sm text-center">Flower {item.toString().padStart(2, '0')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Puja Flowers & Leaves */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Puja Flowers & Leaves</h2>
          <Link to="/puja-flowers" className="text-sm text-green-600">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg p-2">
              <div className="bg-gray-200 rounded-lg h-40 mb-2"></div>
              <p className="text-sm text-center">Flower {item.toString().padStart(2, '0')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Store</span>
            </Link>
            <Link to="/products" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-xs">Products</span>
            </Link>
            <Link to="/wallet" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-xs">Wallet</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
