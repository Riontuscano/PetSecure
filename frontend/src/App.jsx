import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function SimulationData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    socket.on('simulationData', (message) => {
      const parsed = JSON.parse(message);
      setData(parsed);
    });

    return () => socket.off('simulationData');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md transition-all duration-300 hover:shadow-xl">
        {data ? (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xl font-semibold text-gray-800">📅 Timestamp:</p>
            <p className="text-lg text-gray-600">
              {new Date(data.timestamp * 1000).toLocaleString()}
            </p>
            <p className="text-xl font-semibold text-gray-800">📊 Value:</p>
            <p className="text-3xl font-bold text-blue-500">
              {data.value}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center animate-pulse">
            Waiting for data...
          </p>
        )}
      </div>
    </div>
  );
}

export default SimulationData;
