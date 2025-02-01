
"use client";
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function DetectionForm({ onDetectionResult }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onDetectionResult(data); // Pass data to parent component
    } catch (error) {
      console.error("Detection error:", error);
      onDetectionResult({ isBot: null, logs: ["Detection error: " + error.message] }); // Handle error in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bot Detector</h2>
      <p className="text-gray-600 mb-4">Enter a Twitter username to check if it's a bot.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter username"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
          >
            {loading ? <span className="animate-pulse">Analyzing...</span> : (
              <>
                <FaSearch className="inline-block mr-2" /> Detect Bot
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
