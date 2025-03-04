import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUser, 
  FaMapMarkerAlt, 
  FaClock,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaCamera,
  FaEdit,
  FaMapMarked
} from 'react-icons/fa';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
    profileImage: null as string | null
  });

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Address management state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      isDefault: true,
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      isEditing: false
    }
  ]);

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Address handlers
  const handleSaveAddress = (id: number) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? {...addr, isEditing: false} : addr
    ));
  };

  const handleEditAddress = (id: number) => {
    setAddresses(addresses.map(addr =>
      addr.id === id ? {...addr, isEditing: true} : addr
    ));
  };

  const handleAddNewAddress = () => {
    const newId = Math.max(...addresses.map(a => a.id)) + 1;
    setAddresses([...addresses, {
      id: newId,
      ...newAddress,
      isDefault: false,
      isEditing: false
    }]);
    setShowNewAddressForm(false);
    setNewAddress({
      type: 'Home',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: ''
    });
  };

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      // Here you would typically make an API call to reverse geocode the coordinates
      console.log(position.coords.latitude, position.coords.longitude);
      
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <FaArrowLeft />
          </button>
          <h1 className="text-xl font-semibold ml-4">Account & Preferences</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {userDetails.profileImage ? (
                  <img 
                    src={userDetails.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-4xl text-gray-400" />
                )}
              </div>
              <button 
                className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaCamera className="text-sm" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="md:ml-6 flex-1 w-full">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter your name"
                    className="text-lg font-semibold w-full border-b-2 border-gray-200 focus:border-green-600 transition-colors pb-1 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-2" />
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails(prev => ({...prev, phone: e.target.value}))}
                      placeholder="Enter phone number"
                      className="w-full border-b-2 border-gray-200 focus:border-green-600 transition-colors pb-1 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-xs text-gray-500 mb-1 block">Email Address</label>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails(prev => ({...prev, email: e.target.value}))}
                      placeholder="Enter email address"
                      className="w-full border-b-2 border-gray-200 focus:border-green-600 transition-colors pb-1 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MY profile Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <Link to="/profile/edit" className="flex items-center p-4 border-b hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaUser className="text-xl text-gray-600" />
            </div>
            <div className="flex-1 ml-3">
              <h3 className="text-base font-medium">MY profile</h3>
              <p className="text-xs text-gray-500">Edit Address, Delivery details</p>
            </div>
            <FaChevronRight className="text-gray-400" />
          </Link>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4 border-b">
            <h3 className="text-base font-medium mb-4">Saved Addresses</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((addr) => (
                <div key={addr.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                      <FaMapMarkerAlt className="text-xl text-green-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">{addr.type}</h4>
                        <div className="flex items-center space-x-2">
                          {addr.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                          )}
                          <button 
                            onClick={() => handleEditAddress(addr.id)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                      {addr.isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Address"
                            className="w-full p-2 border rounded focus:border-green-600 focus:outline-none"
                            value={addr.address}
                            onChange={(e) => setAddresses(addresses.map(a => 
                              a.id === addr.id ? {...a, address: e.target.value} : a
                            ))}
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Landmark"
                              className="flex-1 p-2 border rounded focus:border-green-600 focus:outline-none"
                              value={addr.landmark}
                              onChange={(e) => setAddresses(addresses.map(a =>
                                a.id === addr.id ? {...a, landmark: e.target.value} : a
                              ))}
                            />
                            <button 
                              onClick={() => handleSaveAddress(addr.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="City"
                              className="flex-1 p-2 border rounded focus:border-green-600 focus:outline-none"
                              value={addr.city}
                            />
                            <input
                              type="text"
                              placeholder="Pincode"
                              className="w-24 p-2 border rounded focus:border-green-600 focus:outline-none"
                              value={addr.pincode}
                            />
                          </div>
                          <button 
                            className="flex items-center text-blue-600 space-x-1 hover:text-blue-700 transition-colors"
                            onClick={getCurrentLocation}
                          >
                            <FaMapMarked />
                            <span>Use current location</span>
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">
                          {addr.address}
                          {addr.landmark && <span className="block text-xs text-gray-500 mt-1">Landmark: {addr.landmark}</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showNewAddressForm ? (
              <div className="mt-6 border rounded-lg p-4">
                <h4 className="font-medium mb-4">Add New Address</h4>
                <div className="space-y-3">
                  <select 
                    className="w-full p-2 border rounded focus:border-green-600 focus:outline-none"
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full p-2 border rounded focus:border-green-600 focus:outline-none"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Landmark"
                    className="w-full p-2 border rounded focus:border-green-600 focus:outline-none"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="City"
                      className="flex-1 p-2 border rounded focus:border-green-600 focus:outline-none"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="flex-1 w-24 p-2 border rounded focus:border-green-600 focus:outline-none"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    />
                  </div>
                  <button 
                    className="flex items-center text-blue-600 space-x-1 hover:text-blue-700 transition-colors"
                    onClick={getCurrentLocation}
                  >
                    <FaMapMarked />
                    <span>Use current location</span>
                  </button>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setShowNewAddressForm(false)}
                      className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNewAddress}
                      className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowNewAddressForm(true)}
                className="mt-6 w-full border border-green-600 text-green-600 rounded-lg py-2 font-medium hover:bg-green-50 transition-colors"
              >
                Add New Address
              </button>
            )}
          </div>
        </div>

        {/* Rest of the components remain unchanged */}
        {/* Delivery Time Slot */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaClock className="text-xl text-gray-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium">Delivery Time Slot</h3>
                  <p className="text-xs text-gray-500">Set your preferred delivery time</p>
                </div>
              </div>
              <FaChevronRight className="text-gray-400" />
            </div>
            <div className="mt-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">Order Updates</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Promotional Offers</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Delivery Updates</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4">
            <h3 className="text-base font-medium mb-2">Language</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-green-600 text-white p-2 rounded-lg text-sm font-medium">
                English
              </button>
              <button className="border border-gray-200 p-2 rounded-lg text-sm">
                हिंदी
              </button>
              <button className="border border-gray-200 p-2 rounded-lg text-sm">
                ગુજરાતી
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-600 rounded-lg py-3 font-medium mb-6 hover:bg-red-100 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;