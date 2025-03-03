import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MdMyLocation } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

// Define types for position and map
interface Position {
  lat: number;
  lng: number;
}

const SetupLocation: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const navigate = useNavigate();

  const defaultCenter: Position = {
    lat: 20.5937, // Default center (India)
    lng: 78.9629
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  // Get current location
  const getCurrentLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedPosition(pos);
          map?.panTo(pos);
          // Convert coordinates to address
          getAddressFromCoordinates(pos);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Convert coordinates to address using Geocoding API
  const getAddressFromCoordinates = async (position: Position): Promise<void> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();
      if (data.results[0]) {
        setLocation(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  // Handle map click
  const handleMapClick = async (event: google.maps.MapMouseEvent): Promise<void> => {
    if (event.latLng) {
      const clickedPos: Position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setSelectedPosition(clickedPos);
      await getAddressFromCoordinates(clickedPos);
    }
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleConfirmLocation = (): void => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="p-4 sm:p-6">
        <div className="max-w-md mx-auto">
          <button onClick={handleGoBack} className="mb-4 flex items-center text-black">
            <FaArrowLeft className="text-xl" />
            <span className="ml-2 hidden sm:inline">Back</span>
          </button>
          <div className="mb-2 text-sm text-gray-600 text-start">Step 4 of 4</div>
          <h1 className="text-2xl font-bold mb-2 text-start">Setup your location</h1>
          <p className="text-gray-600 mb-6 text-start">
            Lorem ipsum dolor sit amet consectetur. Nunc orci maecenas ut tincidunt a nibh.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative w-full h-[400px] mb-4">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedPosition || defaultCenter}
            zoom={13}
            onClick={handleMapClick}
            onLoad={map => setMap(map)}
          >
            {selectedPosition && (
              <Marker position={selectedPosition} />
            )}
          </GoogleMap>
        </LoadScript>
        
        {/* Locate Me Button */}
        <button
          onClick={getCurrentLocation}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
        >
          <MdMyLocation className="text-gray-700 text-xl" />
        </button>
      </div>

      {/* Location Input and Button Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 sm:p-6 border-t border-gray-200">
        <div className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your location*"
            />
            {location && (
              <button 
                onClick={() => {
                  setLocation('');
                  setSelectedPosition(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          <button 
            onClick={handleConfirmLocation}
            className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirm location
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupLocation;