import React, { useState } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Thermometer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated weather data - in a real app, this would come from an API
  const simulateWeatherData = (cityName) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockData = {
        city: cityName,
        temperature: Math.floor(Math.random() * 25) + 10, // 10-35°C
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        forecast: Array.from({ length: 5 }, () => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][Math.floor(Math.random() * 5)],
          temp: Math.floor(Math.random() * 25) + 10,
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
        }))
      };
      setWeather(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      simulateWeatherData(city);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'Cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'Rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Partly Cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Weather Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {loading && (
            <div className="text-center py-8">Loading weather data...</div>
          )}

          {weather && !loading && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">{weather.city}</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getWeatherIcon(weather.condition)}
                      <span className="text-3xl ml-2">{weather.temperature}°C</span>
                    </div>
                    <div className="text-gray-600">{weather.condition}</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Thermometer className="w-5 h-5 text-red-500 mr-2" />
                      <span>Humidity: {weather.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-5 h-5 text-blue-500 mr-2" />
                      <span>Wind Speed: {weather.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="font-medium mb-2">{day.day}</div>
                      {getWeatherIcon(day.condition)}
                      <div className="mt-2">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherApp;