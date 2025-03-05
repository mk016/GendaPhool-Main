import React, { useState, KeyboardEvent } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { MdMyLocation, MdSearch } from 'react-icons/md';

// Google Maps API key from environment variables (Vite syntax)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Define libraries as a constant to prevent reloading
const libraries: ("places")[] = ["places"];

// Type definition for geographical coordinates
interface Position {
  lat: number;
  lng: number;
}

const Location: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState<number>(-1);

  // Default center position (India)
  const defaultCenter: Position = {
    lat: 20.5937,
    lng: 78.9629
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true
  };

  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setSelectedPosition(newPosition);
        setLocation(place.formatted_address || '');
        map?.panTo(newPosition);
        setPredictions([]);
      }
    }
  };

  // Handle keyboard navigation in search results
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (predictions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedPredictionIndex(prev => 
        prev < predictions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedPredictionIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && selectedPredictionIndex >= 0) {
      e.preventDefault();
      handlePredictionSelect(predictions[selectedPredictionIndex]);
    } else if (e.key === 'Tab' && selectedPredictionIndex >= 0) {
      e.preventDefault();
      handlePredictionSelect(predictions[selectedPredictionIndex]);
    }
  };

  const handleLocationSearch = async (input: string) => {
    setLocation(input);
    setSelectedPredictionIndex(-1);
    if (input.length > 2) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input },
        (predictions: google.maps.places.AutocompletePrediction[] | null) => {
          setPredictions(predictions || []);
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionSelect = async (prediction: google.maps.places.AutocompletePrediction) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: prediction.place_id }, (results, status) => {
      if (status === 'OK' && results?.[0]?.geometry?.location) {
        const newPosition = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        setSelectedPosition(newPosition);
        setLocation(prediction.description);
        map?.panTo(newPosition);
        setPredictions([]);
        setSelectedPredictionIndex(-1);
      }
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedPosition(pos);
          map?.panTo(pos);

          // Reverse geocoding to get address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: pos }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              setLocation(results[0].formatted_address);
            }
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const clickedPos = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setSelectedPosition(clickedPos);

      // Reverse geocoding for clicked location
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: clickedPos }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          setLocation(results[0].formatted_address);
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Find Your Location</h1>
          
          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="flex items-center">
              <input
                type="text"
                value={location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                placeholder="Search for your location"
              />
              <button
                onClick={getCurrentLocation}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                aria-label="Get current location"
              >
                <MdMyLocation className="text-gray-500 text-xl" />
              </button>
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                aria-label="Search location"
              >
                <MdSearch className="text-gray-500 text-xl" />
              </button>
            </div>

            {/* Predictions dropdown */}
            {predictions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {predictions.map((prediction, index) => (
                  <div
                    key={prediction.place_id}
                    className={`px-4 py-2 cursor-pointer ${
                      index === selectedPredictionIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handlePredictionSelect(prediction)}
                  >
                    {prediction.description}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg relative">
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
            <button
              onClick={getCurrentLocation}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Get current location"
            >
              <MdMyLocation className="text-gray-700 text-xl" />
            </button>
          </div>

          {/* Confirm Button */}
          {selectedPosition && (
            <div className="mt-6">
              <button 
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
                onClick={() => {
                  // Handle location confirmation here
                  console.log('Selected location:', {
                    address: location,
                    coordinates: selectedPosition
                  });
                }}
              >
                Confirm Location
              </button>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default Location;
