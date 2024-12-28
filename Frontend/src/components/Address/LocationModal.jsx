import  { useState } from 'react';
import PropTypes from 'prop-types';

const LocationModal = ({ isOpen, onClose, onLocationGranted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEnableLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      // Request location permission using a Promise wrapper
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      // Extract coordinates
      const { latitude, longitude } = position.coords;
      
      // Store permission and coordinates
      localStorage.setItem('locationPermission', 'granted');
      localStorage.setItem('userLatitude', latitude.toString());
      localStorage.setItem('userLongitude', longitude.toString());

      // Notify parent component
      onLocationGranted({ latitude, longitude });
      onClose();
    } catch (err) {
      let errorMessage = 'Failed to get location. ';
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage += 'Location permission was denied.';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage += 'Location information is unavailable.';
          break;
        case err.TIMEOUT:
          errorMessage += 'Location request timed out.';
          break;
        default:
          errorMessage += err.message || 'Unknown error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchManually = () => {
    localStorage.setItem('locationPermission', 'manual');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Enable Location Services</h2>
        
        <p className="text-gray-600">
          Please enable your location to get the best experience or search for an address manually.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleEnableLocation}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enabling...
              </span>
            ) : (
              'Enable Location'
            )}
          </button>
          
          <button
            onClick={handleSearchManually}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Search Manually
          </button>
        </div>
      </div>
    </div>
  );
};
LocationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocationGranted: PropTypes.func.isRequired,
};

export default LocationModal;
