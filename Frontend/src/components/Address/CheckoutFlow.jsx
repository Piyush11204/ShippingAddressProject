import { useState, useEffect } from 'react';
import {
  Home,
  Briefcase,
  Users,
  MapPin,
  Plus,
  Trash,
  ArrowLeft,
  ShoppingBag,
  DollarSign,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const AddressType = {
  HOME: 'Home',
  OFFICE: 'Office',
  FRIENDS: 'Friends & Family',
  CUSTOM: 'Custom',
};

const CheckoutFlow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [coordinates, setCoordinates] = useState(
    localStorage.getItem('userLatitude') && localStorage.getItem('userLongitude')
      ? {
          lat: parseFloat(localStorage.getItem('userLatitude')),
          lng: parseFloat(localStorage.getItem('userLongitude')),
        }
      : { lat: 0, lng: 0 }
  );
  const [addressForm, setAddressForm] = useState({
    type: AddressType.HOME,
    houseNumber: '',
    apartment: '',
    street: '',
    area: '',
    fullAddress: '',
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const apiKey = 'AIzaSyAH7iDFCffRLwIJ56UUnkwBOhNzmSL2uMQ';

  useEffect(() => {
    const loadedAddresses = localStorage.getItem('savedAddresses');
    if (loadedAddresses) {
      setSavedAddresses(JSON.parse(loadedAddresses));
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/getproductbyid/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        });
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

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

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setCoordinates(address.coordinates);
    setIsConfirmationVisible(true);
  };

  const handleLocateMe = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newLocation);
          reverseGeocode(newLocation);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          alert('Unable to retrieve your location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  const reverseGeocode = async (coords) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setAddressForm((prev) => ({ ...prev, fullAddress: address }));
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
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

  const handleDeleteAddress = (id) => {
    const updatedAddresses = savedAddresses.filter((address) => address.id !== id);
    setSavedAddresses(updatedAddresses);
    saveAddressToStorage(updatedAddresses);
    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const saveAddressToStorage = (addresses) => {
    localStorage.setItem('savedAddresses', JSON.stringify(addresses));
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
    saveAddressToStorage(updatedAddresses);
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

  const handleConfirmPurchase = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/product/products/${id}/buy`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryAddress: selectedAddress,
        }),
      });
      alert('Purchase successful!');
      navigate('/orders');
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header with back button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Product
        </button>
      </div>
      {/* Product Preview */}
      {product && (
        <div className="max-w-4xl mx-auto mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold">{product.ProductName}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">${product.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        {/* Address Selection */}
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
            onClick={() => handleSelectAddress(address)}
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
        {/* Address Form */}
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
        {/* Locate Me Button */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <button
          onClick={handleLocateMe}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loading ? 'Locating...' : 'Use Current Location'}
        </button>
        </div>
        {/* Map Display */}
        <div className="max-w-4xl mx-auto mb-6 h-64 bg-gray-200 rounded-lg">
        {/* Map component implementation goes here */}
        <iframe
          title="Map"
          src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coordinates.lat},${coordinates.lng}&zoom=14`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        />
        <p className="text-center pt-28 text-gray-500">Map Placeholder</p>
        </div>
        {/* Confirm Purchase */}
        <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <button
          onClick={handleConfirmPurchase}
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Confirm Purchase
        </button>
        </div>
      </div>
      );
    };
    
    export default CheckoutFlow;

