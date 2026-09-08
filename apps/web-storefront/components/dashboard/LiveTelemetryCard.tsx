import React from 'react';

interface TelemetryData {
  rpm: number;
  engineTemp: number;
  batteryVoltage: number;
}

export default function LiveTelemetryCard({ data }: { data: TelemetryData | null }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <div className="bg-gray-800/50 p-2 rounded-lg flex flex-col items-center justify-center border border-gray-700/50">
        <span className="text-[10px] text-gray-400 uppercase">RPM</span>
        <span className="text-sm font-semibold font-mono">{data?.rpm || 0}</span>
      </div>
      <div className="bg-gray-800/50 p-2 rounded-lg flex flex-col items-center justify-center border border-gray-700/50">
        <span className="text-[10px] text-gray-400 uppercase">Temp</span>
        <span className="text-sm font-semibold font-mono">{data?.engineTemp || 0}°C</span>
      </div>
      <div className="bg-gray-800/50 p-2 rounded-lg flex flex-col items-center justify-center border border-gray-700/50">
        <span className="text-[10px] text-gray-400 uppercase">Battery</span>
        <span className="text-sm font-semibold font-mono">{data?.batteryVoltage || '0.0'}V</span>
      </div>
    </div>
  );
}
