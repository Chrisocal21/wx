import { useState, useEffect, useRef } from 'react';
import { searchCities, type GeocodingResult } from '../services/geocoding';

interface SearchBarProps {
  onSelectLocation: (location: GeocodingResult) => void;
  onClose?: () => void;
}

export default function SearchBar({ onSelectLocation, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const cities = await searchCities(query, 8);
        setResults(cities);
        
        if (cities.length === 0) {
          setError('No cities found');
        }
      } catch (e) {
        setError('Failed to search cities');
        console.error('Search error:', e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (location: GeocodingResult) => {
    onSelectLocation(location);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-3 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-xl transition-colors touch-manipulation"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-xl transition-colors touch-manipulation"
            >
              <div className="font-medium">{result.name}</div>
              <div className="text-sm text-white/70">
                {result.admin1 && `${result.admin1}, `}{result.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-white/70 text-sm text-center py-4">
          {error}
        </div>
      )}

      {/* Instructions */}
      {!query && !results.length && (
        <div className="text-white/60 text-sm text-center py-4">
          Type at least 2 characters to search
        </div>
      )}
    </div>
  );
}
