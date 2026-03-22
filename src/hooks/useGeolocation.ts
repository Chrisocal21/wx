import { useState, useEffect } from 'react';
import type { Location } from '../types/weather';

interface GeolocationState {
  location: Location | null;
  loading: boolean;
  error: string | null;
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    // Use BigDataCloud reverse geocoding API (free, no key required)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    
    // Build location name from available data
    const city = data.city || data.locality || data.principalSubdivision;
    const region = data.principalSubdivisionCode || data.principalSubdivision;
    
    if (city && region && city !== region) {
      return `${city}, ${region}`;
    } else if (city) {
      return city;
    } else if (data.countryName) {
      return data.countryName;
    }
    
    return 'Current Location';
  } catch (e) {
    console.error('Reverse geocoding error:', e);
    return 'Current Location';
  }
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Get the location name via reverse geocoding
        const name = await reverseGeocode(lat, lon);
        
        setState({
          location: {
            lat,
            lon,
            name,
          },
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          location: null,
          loading: false,
          error: error.message,
        });
      }
    );
  }, []);

  return state;
}
