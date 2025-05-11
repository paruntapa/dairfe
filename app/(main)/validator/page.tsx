"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as nacl from 'tweetnacl';
import { useWebSocket } from '../../hooks/useWebSocket';

interface ValidationRequest {
  placeId: string;
  lat: number;
  lng: number;
  callbackId: string;
  placeName?: string;
}

interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no: number;
  so2: number;
  nh3: number;
  no2: number;
  o3: number;
}

const ValidatorPage = () => {
  const { publicKey, signMessage } = useWallet();
  const { connection } = useConnection();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [openWeatherApiKey, setOpenWeatherApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [validationRequests, setValidationRequests] = useState<ValidationRequest[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<ValidationRequest | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [isValidating, setIsValidating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // WebSocket connection
  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

  // Check for OpenWeather API key on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('openWeatherApiKey');
    if (storedApiKey) {
      setOpenWeatherApiKey(storedApiKey);
    } else if (isSignedUp) {
      setShowApiKeyModal(true);
    }
  }, [isSignedUp]);

  // Handle WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      
      if (data.type === 'signup') {
        setIsSignedUp(true);
        if (!localStorage.getItem('openWeatherApiKey')) {
          setShowApiKeyModal(true);
        }
      } else if (data.type === 'validate') {
        console.log("validate", data.data)
        setValidationRequests(prev => [...prev, data.data]);
      }
    }
  }, [lastMessage]);

  // Sign up handler
  const handleSignUp = async () => {
    if (!publicKey || !signMessage) return;
    const callbackId = crypto.randomUUID();

    try {
      const message = `Signed message for ${callbackId}, ${publicKey.toString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);
      
      sendMessage(JSON.stringify({
        type: 'signup',
        data: {
          publicKey: publicKey.toString(),
          signedMessage: Array.from(signedMessage),
          callbackId: callbackId
        }
      }));
    } catch (err) {
      setError('Failed to sign message. Please try again.');
    }
  };

  const handleSaveApiKey = () => {
    if (openWeatherApiKey.trim()) {
      localStorage.setItem('openWeatherApiKey', openWeatherApiKey.trim());
      setShowApiKeyModal(false);
    }
  };

  const handleRequestPlaces = () => {
    sendMessage(JSON.stringify({
      type: 'request_places',
      data: {
        callbackId: crypto.randomUUID()
      }
    }));
  };

  const fetchAirQualityData = async (place: ValidationRequest) => {
    if (!openWeatherApiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setIsValidating(place.placeId);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${place.lat}&lon=${place.lng}&appid=${openWeatherApiKey}`
      );
      const data = await response.json();
      
      if (data.list && data.list[0]) {
        const airData = data.list[0].components;
        setAirQualityData({
          aqi: data.list[0].main.aqi,
          pm25: airData.pm2_5,
          pm10: airData.pm10,
          co: airData.co,
          no: airData.no,
          so2: airData.so2,
          nh3: airData.nh3,
          no2: airData.no2,
          o3: airData.o3
        });
      }
    } catch (err) {
      setError('Failed to fetch air quality data');
    } finally {
      setIsValidating(null);
    }
  };

  const sendValidationData = async (place: ValidationRequest) => {
    if (!airQualityData || !publicKey || !signMessage) return;
    console.log("inside sencalidate", place)

    try {
      const message = `Replying to ${place.callbackId}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);

      sendMessage(JSON.stringify({
        type: 'validate',
        data: {
          placeId: place.placeId,
          callbackId: place.callbackId,
          validatorId: publicKey.toString(),
          signedMessage: Array.from(signedMessage),
          ...airQualityData
        }
      }));

      // Remove the validated place from the list
      setValidationRequests(prev => prev.filter(p => p.placeId !== place.placeId));
      setSelectedPlace(null);
      setAirQualityData(null);
    } catch (err) {
      setError('Failed to send validation data');
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Validator Dashboard</h1>
          <p className="text-gray-300">
            Monitor and validate air quality data for locations around the world.
          </p>
        </div>

        {!isSignedUp ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Become a Validator</h2>
            <p className="text-gray-300 mb-4">
              Connect your wallet to start validating air quality data.
            </p>
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
            >
              Authenticate with Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={handleRequestPlaces}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-colors"
              >
                Request Places to Validate
              </button>
            </div>

            {validationRequests.length > 0 ? (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Place Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Latitude
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Longitude
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {validationRequests.map((place, index) => (
                      <tr key={index} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {place.placeName ? place.placeName : 'Unknown Location'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {place.lat.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {place.lng.toFixed(4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => {
                              setSelectedPlace(place);
                              fetchAirQualityData(place);
                            }}
                            disabled={isValidating === place.placeId}
                            className={`px-3 py-1 rounded-md text-white font-medium transition-colors ${
                              isValidating === place.placeId
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                          >
                            {isValidating === place.placeId ? 'Validating...' : 'Validate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-300">No places to validate at the moment.</p>
              </div>
            )}
          </>
        )}

        {/* OpenWeather API Key Modal */}
        {showApiKeyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">OpenWeather API Key Required</h2>
              <p className="text-gray-300 mb-4">
                Please enter your OpenWeather API key to continue validating air quality data.
              </p>
              <input
                type="text"
                value={openWeatherApiKey}
                onChange={(e) => setOpenWeatherApiKey(e.target.value)}
                placeholder="Enter your OpenWeather API key"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Air Quality Data Modal */}
        {selectedPlace && airQualityData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-xl font-semibold mb-4">Air Quality Data</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">AQI</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.aqi}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">PM2.5</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.pm25} μg/m³</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">PM10</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.pm10} μg/m³</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">O3</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.o3} ppm</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">NO2</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.no2} ppm</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">CO</h3>
                  <p className="text-2xl font-bold text-white">{airQualityData.co} ppm</p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setSelectedPlace(null);
                    setAirQualityData(null);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendValidationData(selectedPlace)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-colors"
                >
                  Submit Validation
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ValidatorPage;