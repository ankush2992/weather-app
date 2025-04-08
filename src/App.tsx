import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorMessage from './components/ErrorMessage';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import { getWeather, getForecast } from './services/weatherService';
import { WeatherData, ForecastData } from './types/weather';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherResponse = await getWeather(city);
      setWeatherData(weatherResponse);
      
      const forecastResponse = await getForecast(city);
      setForecastData(forecastResponse);
      
      // Add to search history if not already present
      if (!searchHistory.includes(city)) {
        const newHistory = [city, ...searchHistory].slice(0, 5);
        setSearchHistory(newHistory);
      }
    } catch (err: any) {
      console.error("Error fetching weather data:", err);
      if (err.response && err.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else {
        setError("Failed to fetch weather data. Please try again later.");
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 px-4 transition-colors">
      <div className="container mx-auto max-w-2xl">
        <header className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Check the weather anywhere in the world</p>
          <ThemeToggle />
        </header>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        <SearchHistory searches={searchHistory} onSelect={handleSearch} />
        
        {error && <ErrorMessage message={error} />}
        
        {weatherData && !error && (
          <div className="space-y-6">
            <div className="flex justify-end mb-2">
              <button 
                onClick={handleRefresh}
                className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
                disabled={loading}
              >
                <svg className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            
            <WeatherCard data={weatherData} />
            
            {forecastData && <ForecastCard data={forecastData} />}
          </div>
        )}
        
        {!weatherData && !error && !loading && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Enter a city name to get the weather forecast</p>
          </div>
        )}
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
