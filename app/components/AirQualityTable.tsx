"use client";

import React from 'react';
import { getStatusColor } from '../constants/utils';

// Update the interface to include validatorFetching
export interface AirQualityData {
  id: string;
  placeName: string;
  latitude: number;
  longitude: number;
  aqi?: number;
  pm25?: number;
  pm10?: number;
  o3?: number;
  no2?: number;
  co?: number;
  so2?: number;
  updatedAt?: string;
  status?: 'Good' | 'Moderate' | 'Better not go out' | 'Unhealthy' | 'VERY_UNHEALTHY' | 'Hazardous';
  validatorFetching?: boolean;
}

interface AirQualityTableProps {
  data: AirQualityData[] | null;
  isLoading: boolean;
}

export const AirQualityTable: React.FC<AirQualityTableProps> = ({ data, isLoading }) => {
  // Function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Render skeleton rows when loading
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, i) => (
      <tr key={`skeleton-${i}`} className="border-b border-gray-700">
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-24"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-24"></div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Location
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Latitude
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Longitude
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              AQI
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              PM2.5
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              PM10
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              O3
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              NO2
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              CO
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
              Request Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {isLoading ? (
            renderSkeletons()
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4 text-sm font-medium text-white">
                  {item.placeName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.latitude.toFixed(4)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.longitude.toFixed(4)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.aqi ?? 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.pm25 ? `${item.pm25} μg/m³` : 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.pm10 ? `${item.pm10} μg/m³` : 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.o3 ? `${item.o3} ppm` : 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.no2 ? `${item.no2} ppm` : 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.co ? `${item.co} ppm` : 'Pending'}
                </td>
                <td className="py-3 px-4 text-sm text-gray-300 text-center">
                  {item.updatedAt ? formatDate(item.updatedAt) : 'Pending'}
                </td>
                <td className="py-3 px-4 text-center">
                  {item.status ? (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 cursor-pointer font-semibold rounded-full ${getStatusColor(item.status)} text-white`}>
                      {item.status}
                    </span>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {item.validatorFetching ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-400 text-xs">Processing</span>
                    </div>
                  ) : item.aqi ? (
                    <span className="text-green-400 text-xs">Completed</span>
                  ) : (
                    <span className="text-orange-400 text-xs">Awaiting Validator</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="py-24 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-8 h-8 text-gray-400"
                    >
                      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">No Air Quality Data</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    You haven't requested any air quality data yet. Use the form above to request data for a specific location.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}; 