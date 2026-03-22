import type { WeatherCondition } from '../types/weather';

// WMO Weather interpretation codes
// https://www.noaa.gov/weather
export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2) return 'partly-cloudy';
  if (code === 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 51 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 99) return 'storm';
  
  return 'clear';
}

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  return descriptions[code] || 'Unknown';
}

interface TimeOfDay {
  hour: number;
  sunrise: Date;
  sunset: Date;
}

export function getTimeOfDayCondition({ hour, sunrise, sunset }: TimeOfDay): 'day' | 'night' | 'sunrise' | 'sunset' {
  const sunriseHour = sunrise.getHours();
  const sunsetHour = sunset.getHours();
  
  // Within 1 hour of sunrise/sunset
  if (Math.abs(hour - sunriseHour) <= 1) return 'sunrise';
  if (Math.abs(hour - sunsetHour) <= 1) return 'sunset';
  
  if (hour >= sunriseHour && hour < sunsetHour) return 'day';
  return 'night';
}
