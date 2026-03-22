import type { DailyWeather, TemperatureUnit } from '../types/weather';
import { getWeatherDescription, getWeatherCondition } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

interface DailyForecastProps {
  daily: DailyWeather;
  temperatureUnit: TemperatureUnit;
}

export default function DailyForecast({ daily }: DailyForecastProps) {
  const days = daily.time.slice(0, 7);

  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 tracking-tight">7-Day Forecast</h3>
      <div className="space-y-2">
        {days.map((date, index) => {
          const maxTemp = Math.round(daily.temperature_2m_max[index]);
          const minTemp = Math.round(daily.temperature_2m_min[index]);
          const weatherCode = daily.weathercode[index];
          const precipitation = daily.precipitation_probability_max[index];

          return (
            <div
              key={date}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
            >
              <div className="flex-1 text-white font-semibold min-w-[50px] sm:min-w-[60px] text-sm sm:text-base">
                {getDayName(date, index)}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <WeatherIcon 
                  condition={getWeatherCondition(weatherCode)} 
                  size={24} 
                  className="text-white/70 flex-shrink-0"
                />
                <span className="text-white/70 text-xs sm:text-sm font-medium truncate">
                  {getWeatherDescription(weatherCode)}
                </span>
              </div>

              {precipitation > 0 && (
                <div className="text-blue-200 text-xs sm:text-sm font-medium flex-shrink-0">
                  {precipitation}%
                </div>
              )}
              
              <div className="flex gap-2 sm:gap-3 items-center tabular-nums flex-shrink-0">
                <span className="text-white text-base sm:text-lg font-semibold">{maxTemp}°</span>
                <span className="text-white/60 text-base sm:text-lg font-medium">{minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
