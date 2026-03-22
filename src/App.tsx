import { useState } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { useSavedLocations } from './hooks/useSavedLocations';
import Feed from './components/Feed';
import SearchBar from './components/SearchBar';
import LocationSwitcher from './components/LocationSwitcher';
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

  // Determine which location to use for weather
  const weatherLocation = selectedLocation
    ? { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, temperatureUnit }
    : currentLocation
    ? { latitude: currentLocation.lat, longitude: currentLocation.lon, temperatureUnit }
    : null;

  // Fetch weather for the active location
  const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(weatherLocation);

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

