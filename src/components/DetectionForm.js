
"use client";
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function DetectionForm({ onDetectionResult }) {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('twitter'); // Default to Twitter
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let apiEndpoint;
    switch (platform) {
      case 'twitter':
        apiEndpoint = '/api/detect';
        break;
      case 'instagram':
        apiEndpoint = '/api/instagram';
        break;
      case 'facebook':
        apiEndpoint = '/api/facebook';
        break;
      case 'telegram':
        apiEndpoint = '/api/telegram';
        break;
      case 'whatsapp':
        apiEndpoint = '/api/whatsapp';
        break;
      default:
        apiEndpoint = '/api/detect'; // default to twitter
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onDetectionResult(data);
    } catch (error) {
      console.error("Detection error:", error);
      onDetectionResult({ isBot: null, logs: ["Detection error: " + error.message] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bot Detector</h2>
      <p className="text-gray-600 mb-4">Enter a username to check if it's a bot.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="platform" className="block text-gray-700 text-sm font-bold mb-2">
            Platform:
          </label>
          <select
            id="platform"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">Whatsapp</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter ${platform.charAt(0).toUpperCase() + platform.slice(1)} username`}
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
