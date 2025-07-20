// src/components/FarmMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L, { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getTheme } from '../lib/utils';

const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

type FarmData = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region?: string;
};

function FlyToFarm({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position, 8, { animate: true });
  return null;
}

const theme = getTheme();

export default function FarmMap() {
  const [farms, setFarms] = useState<FarmData[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      const snapshot = await getDocs(collection(db, 'maps'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FarmData[];

      setFarms(data);
    };

    fetchFarms();
  }, []);

  return (
    <div>
      {/* Legenda */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {farms.map((farm) => (
          <button
            key={farm.id}
            onClick={() => setSelectedPosition([farm.latitude, farm.longitude])}
            className={`text-sm px-3 py-1 rounded  transition ${theme === 'dark' ? 'bg-gray-200 text-gray-800 hover:bg-secondary hover:text-card-foreground' : 'text-white bg-primary hover:bg-secondary hover:text-gray-800'} `}
          >
            {farm.name}
          </button>
        ))}
      </div>

      {/* Mapa */}
      <MapContainer
        center={[-15.78, -47.92]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-64 w-full rounded z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {farms.map((farm) => (
          <Marker key={farm.id} position={[farm.latitude, farm.longitude]}>
            <Popup>{farm.name}</Popup>
          </Marker>
        ))}
        {selectedPosition && <FlyToFarm position={selectedPosition} />}
      </MapContainer>
    </div>
  );
}
