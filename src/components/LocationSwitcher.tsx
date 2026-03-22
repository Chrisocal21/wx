import { useState, useEffect } from 'react';
import type { SavedLocation } from '../services/geocoding';

function getTimeInTimezone(timezone?: string): string {
  if (!timezone) return '';
  try {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    return '';
  }
}

interface LocationSwitcherProps {
  starredLocations: SavedLocation[];
  recentLocations: SavedLocation[];
  selectedLocationId: number | null;
  currentLocationActive: boolean;
  currentLocationName?: string;
  currentLocationTimezone?: string;
  onSelectLocation: (id: number | null) => void;
  onToggleStar: (id: number) => void;
  onRemoveLocation: (id: number) => void;
  onSearchClick: () => void;
}

export default function LocationSwitcher({
  starredLocations,
  recentLocations,
  selectedLocationId,
  currentLocationActive,
  currentLocationName,
  currentLocationTimezone,
  onSelectLocation,
  onToggleStar,
  onRemoveLocation,
  onSearchClick,
}: LocationSwitcherProps) {
  const hasLocations = starredLocations.length > 0 || recentLocations.length > 0;
  const [currentTime, setCurrentTime] = useState(getTimeInTimezone(currentLocationTimezone));

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeInTimezone(currentLocationTimezone));
    }, 60000);
    return () => clearInterval(interval);
  }, [currentLocationTimezone]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
      {/* Header with Search button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold tracking-tight">Locations</h3>
        <button
          onClick={onSearchClick}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-sm font-medium rounded-xl transition-colors touch-manipulation"
        >
          + Add
        </button>
      </div>

      {/* Current Location */}
      <button
        onClick={() => onSelectLocation(null)}
        className={`w-full text-left px-4 py-3 rounded-xl transition-colors touch-manipulation mb-2 ${
          currentLocationActive
            ? 'bg-white/30 text-white'
            : 'bg-white/10 hover:bg-white/20 text-white/90'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{currentLocationName || 'Current Location'}</div>
              {currentTime && (
                <div className="text-xs text-white/60 mt-0.5">{currentTime}</div>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Starred Locations */}
      {starredLocations.length > 0 && (
        <div className="mb-3">
          <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2 px-1">
            Starred
          </div>
          <div className="space-y-2">
            {starredLocations.map((location) => (
              <LocationItem
                key={location.id}
                location={location}
                isSelected={selectedLocationId === location.id}
                onSelect={() => onSelectLocation(location.id)}
                onToggleStar={() => onToggleStar(location.id)}
                onRemove={() => onRemoveLocation(location.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Locations */}
      {recentLocations.length > 0 && (
        <div>
          <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-2 px-1">
            Recent
          </div>
          <div className="space-y-2">
            {recentLocations.map((location) => (
              <LocationItem
                key={location.id}
                location={location}
                isSelected={selectedLocationId === location.id}
                onSelect={() => onSelectLocation(location.id)}
                onToggleStar={() => onToggleStar(location.id)}
                onRemove={() => onRemoveLocation(location.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasLocations && (
        <div className="text-white/60 text-sm text-center py-6">
          No saved locations yet.
          <br />
          Click "+ Add" to search for a city.
        </div>
      )}
    </div>
  );
}

interface LocationItemProps {
  location: SavedLocation;
  isSelected: boolean;
  onSelect: () => void;
  onToggleStar: () => void;
  onRemove: () => void;
}

function LocationItem({ location, isSelected, onSelect, onToggleStar, onRemove }: LocationItemProps) {
  const [localTime, setLocalTime] = useState(getTimeInTimezone(location.timezone));

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(getTimeInTimezone(location.timezone));
    }, 60000);
    return () => clearInterval(interval);
  }, [location.timezone]);

  return (
    <div
      className={`rounded-xl transition-colors ${
        isSelected ? 'bg-white/30' : 'bg-white/10'
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={onSelect}
          className={`flex-1 text-left px-4 py-3 rounded-l-xl transition-colors touch-manipulation ${
            !isSelected && 'hover:bg-white/20 active:bg-white/30'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white">{location.name}</div>
              <div className="text-sm text-white/70">
                {location.admin1 && `${location.admin1}, `}{location.country}
              </div>
            </div>
            {localTime && (
              <div className="text-xs text-white/60 flex-shrink-0">
                {localTime}
              </div>
            )}
          </div>
        </button>

        {/* Star button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar();
          }}
          className="px-3 py-3 hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
          aria-label={location.starred ? 'Unstar' : 'Star'}
        >
          {location.starred ? (
            <svg className="w-5 h-5 text-yellow-300 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
        </button>

        {/* Remove button */}
        {!location.starred && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="px-3 py-3 hover:bg-white/20 active:bg-white/30 rounded-r-xl transition-colors touch-manipulation"
            aria-label="Remove"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
