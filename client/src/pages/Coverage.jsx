import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import warehouseData from "../data/Warehouse.json";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to fly the map
function FlyToLocation({ position }) {
  const map = useMap();

  if (position) {
    map.flyTo(position, 12, { duration: 1.5 });
  }
  return null;
}

export default function Coverage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [flyPosition, setFlyPosition] = useState(null);

  // Filter the warehouses based on text
  const filteredWarehouses = warehouseData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.district.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term) ||
      item.covered_area.some((area) => area.toLowerCase().includes(term))
    );
  });

  // Handle Search Button Click
  const handleSearchClick = () => {
    if (filteredWarehouses.length > 0) {
      const firstMatch = filteredWarehouses[0]; // take the first result
      setFlyPosition([firstMatch.latitude, firstMatch.longitude]);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-4">
        We are available in <span className="text-blue-600">64 districts</span>
      </h1>

      {/* Search Box + Button */}
      <div className="flex justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search district, city, or area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <FlyToLocation position={flyPosition} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredWarehouses.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              eventHandlers={{
                click: () =>
                  setFlyPosition([item.latitude, item.longitude]),
              }}
            >
              <Popup className="text-sm">
                <h3 className="font-bold text-lg">{item.city}</h3>
                <p>
                  <strong>District:</strong> {item.district}
                </p>
                <p>
                  <strong>Region:</strong> {item.region}
                </p>

                <p className="font-semibold mt-2">Covered Areas:</p>
                <ul className="list-disc ml-4">
                  {item.covered_area.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
