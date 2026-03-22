import type { WeatherData } from '../types/weather';

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

export default function WeatherDetails({ weatherData }: WeatherDetailsProps) {
  const { current, daily } = weatherData;
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  const formatVisibility = (visibilityMeters?: number) => {
    if (!visibilityMeters) return 'N/A';
    const miles = (visibilityMeters / 1609.34).toFixed(1);
    return `${miles} mi`;
  };

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 tracking-tight">Details</h3>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* UV Index */}
          {current.uv_index !== undefined && (
            <div className="p-2 sm:p-3 text-center">
              <div className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">UV Index</div>
              <div className="text-white text-xl sm:text-2xl font-semibold mb-0.5 sm:mb-1 tabular-nums">
                {current.uv_index.toFixed(0)}
              </div>
              <div className="text-white/60 text-xs font-medium">
                {getUVLevel(current.uv_index)}
              </div>
            </div>
          )}

          {/* Visibility */}
          {current.visibility && (
            <div className="p-2 sm:p-3 text-center">
              <div className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Visibility</div>
              <div className="text-white text-xl sm:text-2xl font-semibold tabular-nums">
                {formatVisibility(current.visibility)}
              </div>
            </div>
          )}

          {/* Sunrise */}
          <div className="p-2 sm:p-3 text-center">
            <div className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Sunrise</div>
            <div className="text-white text-xl sm:text-2xl font-semibold tabular-nums">
              {formatTime(daily.sunrise[0])}
            </div>
          </div>

          {/* Sunset */}
          <div className="p-2 sm:p-3 text-center">
            <div className="text-white/70 text-xs mb-1.5 sm:mb-2 font-medium uppercase tracking-wide">Sunset</div>
            <div className="text-white text-xl sm:text-2xl font-semibold tabular-nums">
              {formatTime(daily.sunset[0])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
