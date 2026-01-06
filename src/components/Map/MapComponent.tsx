// import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type MapComponentProps = {
  lat?: number;
  lng?: number;
};

// { lat: 40.7128, lng: -74.006 }; // New York City coordinates
const MapComponent = ({ lat = 40.7128, lng = -74.006 }: MapComponentProps) => {
  const position = { lat, lng };
  // const apiKey = String(import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '');
  return (
    <div>{position.lat}</div>
    // <APIProvider apiKey={apiKey}>
    //   <div style={{ height: '400px', width: '100%' }}>
    //     <Map
    //       defaultCenter={position}
    //       defaultZoom={12}
    //       gestureHandling={'greedy'}
    //       disableDefaultUI={false}
    //     >
    //       <Marker position={position} />
    //     </Map>
    //   </div>
    // </APIProvider>
  );
};

export default MapComponent;
