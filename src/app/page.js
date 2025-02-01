"use client";
import DetectionForm from '../components/DetectionForm';
import { useState } from 'react';

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [isBotProfile, setIsBotProfile] = useState(null);

  const handleDetectionResult = (result) => {
    setLogs([]); // Clear previous logs
    setIsBotProfile(null); // Clear previous result
    setLogs(result.logs);
    setIsBotProfile(result.isBot);
  };

  return (
    <div>
      <DetectionForm onDetectionResult={handleDetectionResult} />
      {logs.length > 0 && (
        <div>
          <h2>Detection Logs:</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}
      {isBotProfile !== null && (
        <div>
          <h2>Detection Result:</h2>
          <p>{isBotProfile ? "Bot Profile" : "Not a Bot Profile"}</p>
        </div>
      )}
    </div>
  );
}
