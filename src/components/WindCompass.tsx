interface WindCompassProps {
  direction: number; // Wind direction in degrees (0-360)
  speed: number;
  className?: string;
}

export default function WindCompass({ direction, speed, className = '' }: WindCompassProps) {
  const getCardinalDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        {/* Compass circle background */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-white/20"
          />
          
          {/* Cardinal points */}
          <text x="50" y="15" textAnchor="middle" className="text-white/40 text-[10px] font-medium">N</text>
          <text x="85" y="53" textAnchor="middle" className="text-white/40 text-[10px] font-medium">E</text>
          <text x="50" y="93" textAnchor="middle" className="text-white/40 text-[10px] font-medium">S</text>
          <text x="15" y="53" textAnchor="middle" className="text-white/40 text-[10px] font-medium">W</text>
          
          {/* Wind direction arrow */}
          <g transform={`rotate(${direction} 50 50)`}>
            <path
              d="M 50 20 L 54 45 L 50 40 L 46 45 Z"
              fill="currentColor"
              className="text-white"
            />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-white" />
          </g>
        </svg>
      </div>
      
      {/* Wind info */}
      <div className="text-center mt-1">
        <div className="text-white text-sm font-medium tabular-nums">{Math.round(speed)} mph</div>
        <div className="text-white/60 text-xs">{getCardinalDirection(direction)}</div>
      </div>
    </div>
  );
}
