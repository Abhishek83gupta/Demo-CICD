import React, { useState } from 'react'
import axios from 'axios';

export default function App() {
  const [getResponse, setGetResponse] = useState(null);
  const [healthResponse, setHealthResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/health`);
      setHealthResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkGetAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get`);
      setGetResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        🚀 Github Actions CI/CD 
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={checkHealth}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow"
        >
          Check /api/health
        </button>
        <button
          onClick={checkGetAPI}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
        >
          Check /api/get
        </button>
      </div>

      {loading && <p className="text-gray-600 animate-pulse">Loading...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-full max-w-xl text-center">
          ❌ Error: {error}
        </div>
      )}

      {healthResponse && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-xl">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            ✅ Health Check Response
          </h3>
          <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(healthResponse, null, 2)}
          </pre>
        </div>
      )}

      {getResponse && (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xl">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            📦 GET API Response
          </h3>
          <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(getResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
