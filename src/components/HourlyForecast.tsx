import { useRef, useEffect } from 'react';
import type { HourlyWeather, TemperatureUnit } from '../types/weather';
import { getWeatherCondition } from '../utils/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyWeather;
  temperatureUnit: TemperatureUnit;
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  // Show next 24 hours
  const hours = hourly.time.slice(0, 24);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);

  // Find the current hour index
  const now = new Date();
  const currentHourIndex = hours.findIndex(time => {
    const hourDate = new Date(time);
    return hourDate.getHours() === now.getHours() && 
           hourDate.getDate() === now.getDate();
  });

  // Auto-scroll to current hour on mount
  useEffect(() => {
    if (currentHourRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentItem = currentHourRef.current;
      const scrollPosition = currentItem.offsetLeft - (container.offsetWidth / 2) + (currentItem.offsetWidth / 2);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 tracking-tight">Hourly</h3>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
        <div ref={scrollContainerRef} className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 custom-scrollbar">
          {hours.map((time, index) => {
          const date = new Date(time);
          const hour = date.getHours();
          const displayHour = hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
          const temp = Math.round(hourly.temperature_2m[index]);
          const precipitation = hourly.precipitation_probability[index];
          const weatherCode = hourly.weathercode[index];
          const isCurrentHour = index === currentHourIndex;

          return (
            <div
              key={time}
              ref={isCurrentHour ? currentHourRef : null}
              className={`flex-shrink-0 p-3 sm:p-4 text-center min-w-[72px] sm:min-w-[80px] rounded-xl transition-all ${
                isCurrentHour ? 'bg-white/20 ring-2 ring-white/40' : ''
              }`}
            >
              <div className="text-white text-xs sm:text-sm mb-2 sm:mb-3 font-medium">{displayHour}</div>
              <WeatherIcon 
                condition={getWeatherCondition(weatherCode)} 
                size={32} 
                className="mx-auto mb-2 sm:mb-3 text-white/80"
              />
              <div className="text-white text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 tabular-nums">{temp}°</div>
              {precipitation > 0 && (
                <div className="text-blue-200 text-xs font-medium">{precipitation}%</div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
