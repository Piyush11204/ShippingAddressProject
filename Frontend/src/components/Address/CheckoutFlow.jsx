// CheckoutFlow.jsx
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddressComponents } from './AddressComponents';
import { MapDisplay } from './MapDisplay';

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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const apiKey = 'AIzaSyAH7iDFCffRLwIJ56UUnkwBOhNzmSL2uMQ';

  useEffect(() => {
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
      navigate('/getallproducts');
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
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
              <div>
                <h2 className="text-lg font-semibold">{product.ProductName}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">₹{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address Components */}
      <AddressComponents
        selectedAddress={selectedAddress}
        onAddressSelect={setSelectedAddress}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />

      {/* Location Button */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <button
          onClick={handleLocateMe}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {loading ? 'Locating...' : 'Use Current Location'}
        </button>
      </div>

      {/* Map Component */}
      <MapDisplay apiKey={apiKey} coordinates={coordinates} />

      {/* Confirm Purchase Button */}
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