export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // State/Province
  admin2?: string; // County
  timezone?: string;
}

export interface SavedLocation extends GeocodingResult {
  starred: boolean;
  addedAt: number;
}

/**
 * Search for cities using Open-Meteo Geocoding API
 * @param query - City name to search for
 * @param count - Maximum number of results (default: 5)
 * @returns Array of geocoding results
 */
export async function searchCities(query: string, count: number = 5): Promise<GeocodingResult[]> {
  if (!query.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    name: query,
    count: count.toString(),
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to search cities');
  }

  const data = await response.json();

  // API returns undefined results if no matches found
  if (!data.results) {
    return [];
  }

  return data.results.map((result: any) => ({
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    country_code: result.country_code,
    admin1: result.admin1,
    admin2: result.admin2,
    timezone: result.timezone,
  }));
}

/**
 * Get a display name for a location (City, State, Country)
 */
export function getLocationDisplayName(location: GeocodingResult): string {
  const parts = [location.name];
  
  if (location.admin1) {
    parts.push(location.admin1);
  }
  
  parts.push(location.country);
  
  return parts.join(', ');
}
