import type { WeatherData, TemperatureUnit } from '../types/weather';
import { getWeatherDescription, getWeatherCondition } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  locationName: string;
  temperatureUnit: TemperatureUnit;
  onToggleUnit: () => void;
}

export default function CurrentWeather({
  weatherData,
  locationName,
  temperatureUnit,
  onToggleUnit,
}: CurrentWeatherProps) {
  const { current, daily } = weatherData;
  const description = getWeatherDescription(current.weathercode);

  return (
    <div className="text-white text-center mb-8 sm:mb-12">
      {/* Location and Unit Toggle */}
      <div className="flex justify-between items-start mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{locationName}</h2>
        <button
          onClick={onToggleUnit}
          className="px-4 py-2 sm:py-1.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors text-sm font-medium touch-manipulation"
        >
          °{temperatureUnit === 'celsius' ? 'C' : 'F'}
        </button>
      </div>

      {/* Current Temperature - Hero */}
      <div className="mb-6 sm:mb-8">
        <WeatherIcon 
          condition={getWeatherCondition(current.weathercode)} 
          size={96} 
          className="mx-auto mb-4 sm:mb-6 text-white"
        />
        <div className="text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter mb-2 sm:mb-3 tabular-nums">
          {Math.round(current.temperature_2m)}°
        </div>
        <div className="text-xl sm:text-2xl font-normal mb-2 sm:mb-3">{description}</div>
        <div className="text-base sm:text-lg text-white/80 font-medium tabular-nums">
          H: {Math.round(daily.temperature_2m_max[0])}° L: {Math.round(daily.temperature_2m_min[0])}°
        </div>
      </div>

      {/* Additional Current Data */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
          <div className="text-xs text-white/70 mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Feels Like</div>
          <div className="text-xl sm:text-2xl font-semibold tabular-nums">{Math.round(current.apparent_temperature)}°</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
          <div className="text-xs text-white/70 mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Humidity</div>
          <div className="text-xl sm:text-2xl font-semibold tabular-nums">{current.relative_humidity_2m}%</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
          <div className="text-xs text-white/70 mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Wind</div>
          <div className="text-xl sm:text-2xl font-semibold tabular-nums">{Math.round(current.wind_speed_10m)}<span className="text-sm sm:text-base ml-0.5">mph</span></div>
        </div>
      </div>
    </div>
  );
}
