import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import warehouseData from "../data/Warehouse.json";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Coverage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Search filtering
  const filteredWarehouses = warehouseData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.district.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term) ||
      item.covered_area.some((area) => area.toLowerCase().includes(term))
    );
  });

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-4">
        We are available in <span className="text-blue-600">64 districts</span>
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district, city, or area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Map */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredWarehouses.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
            >
              <Popup className="text-sm">
                <h3 className="font-bold text-lg">{item.city}</h3>
                <p className="mt-1">
                  <span className="font-semibold">District:</span> {item.district}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {item.region}
                </p>
                <p className="font-semibold mt-2">Covered Areas:</p>
                <ul className="list-disc ml-4">
                  {item.covered_area.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>

                <a
                  href={item.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-3 inline-block"
                >
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
