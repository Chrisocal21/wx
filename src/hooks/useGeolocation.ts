import { useState, useEffect } from 'react';
import type { Location } from '../types/weather';

interface GeolocationState {
  location: Location | null;
  loading: boolean;
  error: string | null;
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
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Current Location',
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
