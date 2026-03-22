// Open-Meteo API types
export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  weathercode: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  uv_index?: number;
  visibility?: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  precipitation_probability: number[];
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export type WeatherCondition = 
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'fog';
