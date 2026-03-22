import { useState, useEffect, useCallback } from 'react';
import { fetchWeather, type FetchWeatherParams } from '../services/weather';
import type { WeatherData } from '../types/weather';

interface UseWeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather(params: FetchWeatherParams | null) {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (!params) return;

    let cancelled = false;

    setState(prev => ({ ...prev, loading: true, error: null }));

    fetchWeather(params)
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch weather',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [params?.latitude, params?.longitude, params?.temperatureUnit, refetchTrigger]);

  return { ...state, refetch };
}
