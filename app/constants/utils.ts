/**
 * Get color class for air quality status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'GOOD':
      return 'bg-green-500 hover:bg-green-600';
    case 'MODERATE':
      return 'bg-yellow-600 hover:bg-yellow-800';
    case 'BETTER_NOT_GO_OUT':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'UNHEALTHY':
      return 'bg-red-500 hover:bg-red-600';
    case 'VERY_UNHEALTHY':
      return 'bg-purple-500 hover:bg-purple-600';
    case 'HAZARDOUS':
      return 'bg-rose-900 hover:bg-rose-950';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}; 