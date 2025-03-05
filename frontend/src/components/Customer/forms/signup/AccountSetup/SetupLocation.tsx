import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { MdMyLocation } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

// Google Maps API key from environment variables (Vite syntax)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Define libraries as a constant to prevent reloading
const libraries: ("places")[] = ["places"];

// Type definition for geographical coordinates
interface Position {
  lat: number;
  lng: number;
}

const SetupLocation: React.FC = () => {
  // State management for location details
  const [location, setLocation] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const navigate = useNavigate();

  // Default center position (India)
  const defaultCenter: Position = {
    lat: 20.5937,
    lng: 78.9629
  };

  // Map container styling
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
  };

  // Map options for smooth UI
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true
  };

  // Get user's current location using browser's geolocation API
  const getCurrentLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedPosition(pos);
          if (map) {
            map.panTo(pos);
            map.setZoom(15);
          }
          // Convert coordinates to address
          getAddressFromCoordinates(pos);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Convert geographical coordinates to human-readable address
  const getAddressFromCoordinates = async (position: Position): Promise<void> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results[0]) {
        setLocation(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  // Handle map click events
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

  // Handle place selection from autocomplete
  const onPlaceSelected = (): void => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const pos: Position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setSelectedPosition(pos);
        setLocation(place.formatted_address || '');
        if (map) {
          map.panTo(pos);
          map.setZoom(15);
        }
      }
    }
  };

  // Handle search box place changed
  const onSearchBoxPlacesChanged = (): void => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const pos: Position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          setSelectedPosition(pos);
          setLocation(place.formatted_address || '');
          if (map) {
            map.panTo(pos);
            map.setZoom(15);
          }
        }
      }
    }
  };

  // Navigation handlers
  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleConfirmLocation = (): void => {
    if (location && selectedPosition) {
      // Save location data before navigating
      localStorage.setItem('userLocation', location);
      localStorage.setItem('userCoordinates', JSON.stringify(selectedPosition));
      navigate('/home');
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
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
              Please select your delivery location to see available products
            </p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="px-4 sm:px-6 mb-4">
          <div className="max-w-md mx-auto relative z-10">
            <Autocomplete
              onLoad={autocomplete => setAutocomplete(autocomplete)}
              onPlaceChanged={onPlaceSelected}
            >
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                placeholder="Search for your location"
              />
            </Autocomplete>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button
                onClick={getCurrentLocation}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Get current location"
              >
                <MdMyLocation className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto" style={{ height: '500px' }}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedPosition || defaultCenter}
              zoom={13}
              onClick={handleMapClick}
              onLoad={map => setMap(map)}
              options={mapOptions}
            >
              {selectedPosition && (
                <Marker 
                  position={selectedPosition}
                  animation={window.google?.maps?.Animation?.DROP}
                />
              )}
            </GoogleMap>
          </div>
        </div>

        {/* Location Input and Button Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 sm:p-6 border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <button 
              onClick={handleConfirmLocation}
              disabled={!location || !selectedPosition}
              className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirm location
            </button>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default SetupLocation;