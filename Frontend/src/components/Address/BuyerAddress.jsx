import  { useState, useEffect } from 'react';
import LocationModal from './LocationModal';
import LocationSelector from './CheckoutFlow';


const BuyerAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const locationPermission = localStorage.getItem('locationPermission');
    const latitude = localStorage.getItem('userLatitude');
    const longitude = localStorage.getItem('userLongitude');

    if (!locationPermission) {
      setIsModalOpen(true);
    } else if (locationPermission === 'granted' && latitude && longitude) {
      setLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
    }
  }, []);

  const handleLocationGranted = (coordinates) => {
    setLocation(coordinates);
  };

  return (
    <div className="min-h-screen p-4">
      <LocationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLocationGranted={handleLocationGranted}
      />
      
      <LocationSelector />
    </div>
  );
};

export default BuyerAddress;