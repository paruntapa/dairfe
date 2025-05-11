"use client";

import React, { useState, useEffect } from 'react';
import { AirQualityTable, AirQualityData } from '../../components/AirQualityTable';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';

const RequestDataPage = () => {
  const { publicKey } = useWallet();
  const [token, setToken] = useState<string | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [placeName, setPlaceName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch user's places
  useEffect(() => {
    const fetchUserPlaces = async () => {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        setToken(localStorage.getItem('token') || null);
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/air-quality`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log('Fetched places:', response.data);

        if (response.data.places && Array.isArray(response.data.places)) {
          // Transform the places data to match our AirQualityData interface
          const places = response.data.places.map((place: any) => {
            // Extract airQuality info if it exists
            const airQuality = place.airQuality || {};
            console.log("airQuality", airQuality);
            
            return {
              id: place.id || `place-${Math.random().toString(36).substr(2, 9)}`,
              placeName: place.placeName || 'Unknown Location',
              latitude: place.latitude || 0,
              longitude: place.longitude || 0,
              aqi: airQuality.aqi,
              pm25: airQuality.pm25,
              pm10: airQuality.pm10,
              o3: airQuality.o3,
              no2: airQuality.no2,
              co: airQuality.co,
              so2: airQuality.so2,
              updatedAt: airQuality.updatedAt,
              status: airQuality.status,
              validatorFetching: place.validatorFetching || false
            };
          });
          
          setAirQualityData(places);
        } else {
          setAirQualityData([]);
        }
      } catch (error) {
        console.error('Error fetching user places:', error);
        setAirQualityData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlaces();
  }, [publicKey, token]);

  const handleRequestData = async () => {
    // Validate place name is provided
    if (!placeName.trim()) {
      setError('Place name is required');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      // Prepare request payload
      const requestData: {
        placeName: string;
        latitude?: number;
        longitude?: number;
      } = {
        placeName: placeName.trim()
      };

      // Add latitude and longitude if provided
      if (latitude.trim()) {
        const lat = parseFloat(latitude);
        if (isNaN(lat)) {
          setError('Latitude must be a valid number');
          setIsSubmitting(false);
          return;
        }
        requestData.latitude = lat;
      }

      if (longitude.trim()) {
        const lng = parseFloat(longitude);
        if (isNaN(lng)) {
          setError('Longitude must be a valid number');
          setIsSubmitting(false);
          return;
        }
        requestData.longitude = lng;
      }

      // Make API request to create a new place
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/place/create`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Place request submitted:', response.data);
      
      // Reset form
      setPlaceName('');
      setLatitude('');
      setLongitude('');
      
      // Refresh the places list
      setIsLoading(true);
      const refreshResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/air-quality`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (refreshResponse.data.places && Array.isArray(refreshResponse.data.places)) {
        // Transform the places data
        const places = refreshResponse.data.places.map((place: any) => {
          const airQuality = place.airQuality || {};
          return {
            id: place.id || `place-${Math.random().toString(36).substr(2, 9)}`,
            placeName: place.placeName || 'Unknown Location',
            latitude: place.latitude || 0,
            longitude: place.longitude || 0,
            aqi: airQuality.aqi,
            pm25: airQuality.pm25,
            pm10: airQuality.pm10,
            o3: airQuality.o3,
            no2: airQuality.no2,
            co: airQuality.co,
            so2: airQuality.so2,
            updatedAt: airQuality.updatedAt,
            status: airQuality.status,
            validatorFetching: place.validatorFetching || false
          };
        });
        
        setAirQualityData(places);
      }
      setIsLoading(false);
      
    } catch (error: any) {
      console.error('Error submitting place request:', error);
      setError(error.response?.data?.message || error.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 items-center">
          <h1 className="text-3xl font-bold mb-2 ">Air Quality Data</h1>
          <p className="text-gray-300">
            Request and view real-time air quality measurements for locations around the world.
          </p>
        </div>

        <div className="mb-8">
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200">
                {error}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-auto">
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Place Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter city or location"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-full md:w-auto">
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-300 mb-1">
                  Latitude <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="latitude"
                  placeholder="Enter latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-auto">
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-300 mb-1">
                  Longitude <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="longitude"
                  placeholder="Enter longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full md:w-auto flex items-end">
                <button 
                  className={`px-4 py-2 bg-green-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleRequestData}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Data'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Air Quality Measurements</h2>
          <AirQualityTable data={airQualityData} isLoading={isLoading} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RequestDataPage;