// AddressComponents.jsx
import { useState, useEffect } from 'react';
import { Home, Briefcase, Users, MapPin, Plus, Trash } from 'lucide-react';

const AddressType = {
  HOME: 'Home',
  OFFICE: 'Office',
  FRIENDS: 'Friends & Family',
  CUSTOM: 'Custom',
};

export const AddressComponents = ({ selectedAddress, onAddressSelect, coordinates, setCoordinates }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({
    type: AddressType.HOME,
    houseNumber: '',
    apartment: '',
    street: '',
    area: '',
    fullAddress: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const loadedAddresses = localStorage.getItem('savedAddresses');
    if (loadedAddresses) {
      setSavedAddresses(JSON.parse(loadedAddresses));
    }
  }, []);

  const validateAddressForm = () => {
    const errors = {};
    if (!addressForm.houseNumber.trim()) {
      errors.houseNumber = 'House/Flat number is required';
    }
    if (!addressForm.fullAddress.trim()) {
      errors.fullAddress = 'Full address is required';
    }
    if (addressForm.type === AddressType.CUSTOM && !addressForm.area.trim()) {
      errors.area = 'Area name is required for custom addresses';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = () => {
    if (!validateAddressForm()) return;

    const newAddress = {
      ...addressForm,
      id: Date.now(),
      coordinates: coordinates,
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setShowAddressForm(false);
    setAddressForm({
      type: AddressType.HOME,
      houseNumber: '',
      apartment: '',
      street: '',
      area: '',
      fullAddress: '',
    });
    setValidationErrors({});
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    if (selectedAddress?.id === id) onAddressSelect(null);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case AddressType.HOME:
        return <Home className="w-6 h-6" />;
      case AddressType.OFFICE:
        return <Briefcase className="w-6 h-6" />;
      case AddressType.FRIENDS:
        return <Users className="w-6 h-6" />;
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Select Delivery Address</h3>
        {savedAddresses.length > 0 ? (
          <ul className="space-y-4">
            {savedAddresses.map((address) => (
              <li
                key={address.id}
                className={`flex items-center justify-between p-3 border rounded ${
                  selectedAddress?.id === address.id ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => {
                  onAddressSelect(address);
                  setCoordinates(address.coordinates);
                }}
              >
                <div className="flex items-center gap-3">
                  {getAddressIcon(address.type)}
                  <span>{address.fullAddress}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No saved addresses. Please add one.</p>
        )}
        <button
          onClick={() => setShowAddressForm(true)}
          className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {showAddressForm && (
        <div className="max-w-4xl mx-auto mb-6 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Address Type</label>
              <select
                value={addressForm.type}
                onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md"
              >
                {Object.values(AddressType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">House/Flat Number</label>
              <input
                type="text"
                value={addressForm.houseNumber}
                onChange={(e) => setAddressForm({ ...addressForm, houseNumber: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
              {validationErrors.houseNumber && (
                <p className="text-red-500 text-sm">{validationErrors.houseNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Full Address</label>
              <input
                type="text"
                value={addressForm.fullAddress}
                onChange={(e) => setAddressForm({ ...addressForm, fullAddress: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
              {validationErrors.fullAddress && (
                <p className="text-red-500 text-sm">{validationErrors.fullAddress}</p>
              )}
            </div>
            {addressForm.type === AddressType.CUSTOM && (
              <div>
                <label className="block text-sm font-medium">Area</label>
                <input
                  type="text"
                  value={addressForm.area}
                  onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
                {validationErrors.area && (
                  <p className="text-red-500 text-sm">{validationErrors.area}</p>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddressForm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};