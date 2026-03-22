import type { WeatherData, Location, TemperatureUnit } from '../types/weather';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherDetails from './WeatherDetails';
import { getWeatherCondition, getTimeOfDayCondition } from '../utils/weather';

interface FeedProps {
  weatherData: WeatherData;
  location: Location;
  temperatureUnit: TemperatureUnit;
  onToggleUnit: () => void;
}

export default function Feed({ weatherData, location, temperatureUnit, onToggleUnit }: FeedProps) {
  // Determine background based on current conditions and time of day
  const condition = getWeatherCondition(weatherData.current.weathercode);
  const now = new Date();
  const sunrise = new Date(weatherData.daily.sunrise[0]);
  const sunset = new Date(weatherData.daily.sunset[0]);
  const timeOfDay = getTimeOfDayCondition({ hour: now.getHours(), sunrise, sunset });

  // Background gradient system
  const getBackgroundClass = () => {
    if (timeOfDay === 'sunrise') return 'bg-gradient-to-b from-orange-500 via-orange-400 to-pink-500';
    if (timeOfDay === 'sunset') return 'bg-gradient-to-b from-orange-500 via-pink-500 to-purple-600';
    if (timeOfDay === 'night' && condition === 'clear') return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900';
    if (condition === 'clear') return 'bg-gradient-to-b from-blue-500 via-blue-500 to-blue-600';
    if (condition === 'partly-cloudy') return 'bg-gradient-to-b from-slate-500 via-blue-400 to-blue-500';
    if (condition === 'cloudy') return 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700';
    if (condition === 'rain') return 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800';
    if (condition === 'storm') return 'bg-gradient-to-b from-slate-800 via-purple-900 to-slate-900';
    if (condition === 'snow') return 'bg-gradient-to-b from-slate-400 via-slate-400 to-slate-500';
    return 'bg-gradient-to-b from-slate-900 to-slate-800';
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-2000 ease-in-out`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 max-w-2xl">
        <CurrentWeather
          weatherData={weatherData}
          location={location}
          temperatureUnit={temperatureUnit}
          onToggleUnit={onToggleUnit}
        />
        
        <HourlyForecast
          hourly={weatherData.hourly}
          temperatureUnit={temperatureUnit}
        />
        
        <WeatherDetails weatherData={weatherData} />
        
        <DailyForecast
          daily={weatherData.daily}
          temperatureUnit={temperatureUnit}
        />
      </div>
    </div>
  );
}
