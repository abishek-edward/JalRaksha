import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../services/api';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';

const getRiskColor = (level) => {
  const colors = {
    Low: '#22c55e',
    Medium: '#eab308',
    High: '#f97316',
    Critical: '#ef4444'
  };
  return colors[level] || '#3b82f6';
};

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory().then(setHistory).catch(console.error);
  }, []);

  const center = [22.5, 79.0];

  return (
    <div className="w-full h-full flex flex-col gap-6 flex-1">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">District Outbreak Map</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Low</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Med</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> High</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical</div>
        </div>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex-1 min-h-[600px] overflow-hidden">
        <MapContainer center={center} zoom={5} style={{ height: '600px', width: '100%', borderRadius: '0.5rem', zIndex: 0 }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {history.map((record, idx) => (
             record.latitude && record.longitude ? (
               <CircleMarker 
                  key={idx}
                  center={[record.latitude, record.longitude]}
                  pathOptions={{ color: getRiskColor(record.risk_level), fillColor: getRiskColor(record.risk_level), fillOpacity: 0.6 }}
                  radius={12}
               >
                 <Popup>
                   <div className="text-sm">
                     <strong className="block text-base mb-1">{record.village_name}, {record.district}</strong>
                     Disease: <b>{record.disease}</b><br/>
                     Risk: <span style={{color: getRiskColor(record.risk_level)}} className="font-bold">{record.risk_level}</span><br/>
                     Est Cases: {record.symptom_count}
                   </div>
                 </Popup>
               </CircleMarker>
             ) : null
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
