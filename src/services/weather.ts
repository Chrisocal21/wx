import type { WeatherData } from '../types/weather';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export interface FetchWeatherParams {
  latitude: number;
  longitude: number;
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

export async function fetchWeather({
  latitude,
  longitude,
  temperatureUnit = 'fahrenheit',
}: FetchWeatherParams): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'weathercode',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'wind_speed_10m',
      'wind_direction_10m',
      'uv_index',
      'visibility',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weathercode',
      'precipitation_probability',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'weathercode',
      'precipitation_probability_max',
      'sunrise',
      'sunset',
    ].join(','),
    temperature_unit: temperatureUnit,
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${OPEN_METEO_BASE_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  return response.json();
}
