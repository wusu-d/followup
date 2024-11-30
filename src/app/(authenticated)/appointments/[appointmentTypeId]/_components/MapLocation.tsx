import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface MapLocationProps {
  address: string;
}

const MapLocation = ({ address }: MapLocationProps) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat: lat(), lng: lng() });
      }
    });
  }, [address, isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div className='mt-5'>
      <h4 className='text-[#111] text-base font-bold'>Map Location</h4>
      <div className='h-[150px] mt-3 w-full overflow-hidden relative rounded-[10px]'>
        {/* {!isLoaded && <div>Loading map...</div>} */}
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY || ''}
          onError={(err) => setLoadError(err)}
          onLoad={() => setIsLoaded(true)}
        >
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapLocation;
