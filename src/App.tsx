import { useState, useEffect } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { useSavedLocations } from './hooks/useSavedLocations';
import { usePullToRefresh } from './hooks/usePullToRefresh';
import Feed from './components/Feed';
import SearchBar from './components/SearchBar';
import LocationSwitcher from './components/LocationSwitcher';
import LoadingSkeleton from './components/LoadingSkeleton';
import InstallBanner from './components/InstallBanner';
import type { GeocodingResult } from './services/geocoding';

export default function App() {
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('fahrenheit');
  const [showSearch, setShowSearch] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  
  // Get current device location
  const { location: currentLocation, loading: locationLoading, error: locationError } = useGeolocation();
  
  // Manage saved locations
  const {
    selectedLocation,
    selectedLocationId,
    starredLocations,
    recentLocations,
    addLocation,
    removeLocation,
    toggleStar,
    selectLocation,
  } = useSavedLocations();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // '/' - Open search
      if (e.key === '/' && !showSearch) {
        e.preventDefault();
        setShowSearch(true);
        setShowLocations(false);
      }
      // 'u' - Toggle temperature unit
      else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
      }
      // 'l' - Toggle locations panel
      else if ((e.key === 'l' || e.key === 'L') && !showSearch) {
        e.preventDefault();
        const hasLocations = starredLocations.length > 0 || recentLocations.length > 0;
        if (hasLocations) {
          setShowLocations(prev => !prev);
        }
      }
      // 'Escape' - Close all panels
      else if (e.key === 'Escape') {
        setShowSearch(false);
        setShowLocations(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch, showLocations, starredLocations.length, recentLocations.length]);

  // Pull-to-refresh
  const { pullDistance, isRefreshing } = usePullToRefresh({
    onRefresh: async () => {
      await refetch();
    },
    threshold: 80,
  });

  // Determine which location to use for weather
  const weatherLocation = selectedLocation
    ? { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, temperatureUnit }
    : currentLocation
    ? { latitude: currentLocation.lat, longitude: currentLocation.lon, temperatureUnit }
    : null;

  // Fetch weather for the active location
  const { data: weatherData, loading: weatherLoading, error: weatherError, refetch } = useWeather(weatherLocation);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleSelectSearchResult = (location: GeocodingResult) => {
    addLocation(location);
    setShowSearch(false);
  };

  // Show location switcher if there are saved locations
  const hasLocations = starredLocations.length > 0 || recentLocations.length > 0;

  if (locationLoading && !selectedLocation) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-xl animate-pulse">Locating...</div>
        </div>
      </div>
    );
  }

  if (locationError && !selectedLocation && !hasLocations) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="text-white text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to Wx</h1>
          <p className="text-slate-300 mb-6">
            Enable location access or search for a city to get started.
          </p>
          <button
            onClick={() => setShowSearch(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-xl transition-colors touch-manipulation"
          >
            Search for a City
          </button>
        </div>
      </div>
    );
  }

  if (weatherLoading) {
    return <LoadingSkeleton />;
  }

  if (weatherError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md px-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Unable to Load Weather</h1>
          <p className="text-slate-300 mb-6">{weatherError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-xl transition-colors touch-manipulation"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  // Determine the location display info for Feed
  const locationName = selectedLocation
    ? `${selectedLocation.name}, ${selectedLocation.admin1 || selectedLocation.country}`
    : currentLocation
    ? currentLocation.name
    : 'Unknown';

  return (
    <>
      <InstallBanner />
      
      {/* Pull-to-Refresh Indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          style={{ 
            transform: `translateY(${Math.min(pullDistance, 80)}px)`,
            transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none'
          }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mt-4 flex items-center gap-2">
            <svg 
              className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ transform: `rotate(${pullDistance * 4}deg)` }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-white text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}
      
      {/* Menu Toggle Button */}
      {!showSearch && (
        <button
          onClick={() => setShowLocations(!showLocations)}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-xl transition-colors touch-manipulation"
          aria-label="Toggle locations menu"
        >
          {showLocations ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      )}

      {/* Locations Panel */}
      {showLocations && !showSearch && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm">
          <div className="absolute top-20 right-4 sm:top-24 sm:right-6 w-80 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] overflow-y-auto">
            <LocationSwitcher
              starredLocations={starredLocations}
              recentLocations={recentLocations}
              selectedLocationId={selectedLocationId}
              currentLocationActive={!selectedLocation}
              currentLocationName={currentLocation?.name}
              currentLocationTimezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
              onSelectLocation={(id) => {
                selectLocation(id);
                setShowLocations(false);
              }}
              onToggleStar={toggleStar}
              onRemoveLocation={removeLocation}
              onSearchClick={() => {
                setShowLocations(false);
                setShowSearch(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Search Panel */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-md">
            <SearchBar
              onSelectLocation={handleSelectSearchResult}
              onClose={() => setShowSearch(false)}
            />
          </div>
        </div>
      )}

      {/* Main Weather Feed */}
      <Feed
        weatherData={weatherData}
        locationName={locationName}
        temperatureUnit={temperatureUnit}
        onToggleUnit={toggleTemperatureUnit}
      />
    </>
  );
}

