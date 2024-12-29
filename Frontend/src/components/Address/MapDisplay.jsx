// MapDisplay.jsx
export const MapDisplay = ({ apiKey, coordinates }) => {

    return (
      <div className="max-w-4xl mx-auto mb-6 h-64 bg-gray-200 rounded-lg">
        <iframe
          title="Map"
          src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coordinates.lat},${coordinates.lng}&zoom=14&`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="rounded-lg"
        />
      </div>
    );
  };

