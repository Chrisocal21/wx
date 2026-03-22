import { useState, useEffect } from 'react';
import type { SavedLocation, GeocodingResult } from '../services/geocoding';

const STORAGE_KEY = 'wx_saved_locations';
const SELECTED_KEY = 'wx_selected_location_id';

export function useSavedLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Load saved locations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocations(parsed);
      } catch (e) {
        console.error('Failed to parse saved locations:', e);
      }
    }

    const storedSelected = localStorage.getItem(SELECTED_KEY);
    if (storedSelected) {
      setSelectedLocationId(Number(storedSelected));
    }
  }, []);

  // Save locations to localStorage whenever they change
  useEffect(() => {
    if (locations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [locations]);

  // Save selected location ID to localStorage
  useEffect(() => {
    if (selectedLocationId !== null) {
      localStorage.setItem(SELECTED_KEY, selectedLocationId.toString());
    } else {
      localStorage.removeItem(SELECTED_KEY);
    }
  }, [selectedLocationId]);

  // Add a new location
  const addLocation = (location: GeocodingResult, starred: boolean = false) => {
    // Check if location already exists
    const exists = locations.find(loc => loc.id === location.id);
    if (exists) {
      // If it exists and we're starring it, update the starred status
      if (starred && !exists.starred) {
        toggleStar(location.id);
      }
      setSelectedLocationId(location.id);
      return;
    }

    const newLocation: SavedLocation = {
      ...location,
      starred,
      addedAt: Date.now(),
    };

    setLocations(prev => [...prev, newLocation]);
    setSelectedLocationId(newLocation.id);
  };

  // Remove a location
  const removeLocation = (id: number) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
    if (selectedLocationId === id) {
      setSelectedLocationId(null);
    }
  };

  // Toggle starred status
  const toggleStar = (id: number) => {
    setLocations(prev =>
      prev.map(loc =>
        loc.id === id ? { ...loc, starred: !loc.starred } : loc
      )
    );
  };

  // Select a location
  const selectLocation = (id: number | null) => {
    setSelectedLocationId(id);
  };

  // Get the currently selected location
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);

  // Get starred locations
  const starredLocations = locations.filter(loc => loc.starred);

  // Get recent locations (non-starred, sorted by most recent)
  const recentLocations = locations
    .filter(loc => !loc.starred)
    .sort((a, b) => b.addedAt - a.addedAt);

  return {
    locations,
    selectedLocation,
    selectedLocationId,
    starredLocations,
    recentLocations,
    addLocation,
    removeLocation,
    toggleStar,
    selectLocation,
  };
}
