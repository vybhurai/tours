import React, { useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

const Polyline = ({ path }: { path: google.maps.LatLngLiteral[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#0ea5e9',
      strokeOpacity: 0.6,
      strokeWeight: 4,
      map: map
    });

    return () => {
      polyline.setMap(null);
    };
  }, [map, path]);

  return null;
};

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export const MapComponent: React.FC<MapComponentProps> = ({ 
  locations, 
  center, 
  zoom = 12 
}) => {
  const path = useMemo(() => 
    locations.map(loc => ({ lat: loc.lat, lng: loc.lng })), 
    [locations]
  );
  if (!hasValidKey) {
    return (
      <div className="w-full h-[400px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center p-8 text-center overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-md">
          <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Interactive Discovery Map</h3>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Configure your <strong>Google Maps Platform Key</strong> in the project secrets to visualize tour routes and destinations.
          </p>
          <div className="text-[10px] text-sky-400/60 uppercase font-black tracking-widest bg-sky-400/10 px-4 py-2 rounded-full inline-block">
            Developer Setup Required
          </div>
        </div>
      </div>
    );
  }

  const defaultCenter = center || (locations.length > 0 
    ? { lat: locations[0].lat, lng: locations[0].lng } 
    : { lat: 0, lng: 0 });

  return (
    <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={zoom}
          mapId="DISCOVERY_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          colorScheme='DARK'
        >
          <Polyline path={path} />
          {locations.map((loc, idx) => (
            <AdvancedMarker 
              key={idx} 
              position={{ lat: loc.lat, lng: loc.lng }}
              title={loc.name}
            >
              <div className="relative group">
                <Pin 
                  background="#0ea5e9" 
                  borderColor="#ffffff" 
                  glyphColor="#ffffff" 
                  scale={1.2}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
                  {loc.name}
                </div>
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};
