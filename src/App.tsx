import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import Feed from './components/Feed';

export default function App() {
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('fahrenheit');
  const { location, loading: locationLoading, error: locationError } = useGeolocation();
  
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(
    location ? {
      latitude: location.lat,
      longitude: location.lon,
      temperatureUnit,
    } : null
  );

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  if (locationLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-xl animate-pulse">Locating...</div>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Location Access Required</h1>
          <p className="text-slate-300">{locationError}</p>
          <p className="text-slate-400 mt-4 text-sm">
            Please enable location access in your browser to use Wx.
          </p>
        </div>
      </div>
    );
  }

  if (weatherLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-xl animate-pulse">Loading weather...</div>
        </div>
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Unable to Load Weather</h1>
          <p className="text-slate-300">{weatherError}</p>
        </div>
      </div>
    );
  }

  if (!weatherData || !location) {
    return null;
  }

  return (
    <Feed
      weatherData={weatherData}
      location={location}
      temperatureUnit={temperatureUnit}
      onToggleUnit={toggleTemperatureUnit}
    />
  );
}
