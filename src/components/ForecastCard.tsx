import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  data: ForecastData;
}

const ForecastCard = ({ data }: ForecastCardProps) => {
  // Process forecast data - get one forecast per day (noon)
  const dailyForecasts = data.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12; // Get forecast for noon each day
  }).slice(0, 5); // Limit to 5 days

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto mt-6">
      <div className="p-4 bg-blue-500 text-white">
        <h3 className="text-lg font-semibold">5-Day Forecast</h3>
      </div>
      <div className="flex overflow-x-auto">
        {dailyForecasts.map((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const icon = forecast.weather[0]?.icon;
          
          return (
            <div key={forecast.dt} className="flex-shrink-0 p-4 text-center" style={{ minWidth: '100px' }}>
              <div className="font-medium text-gray-700">{dayName}</div>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt={forecast.weather[0]?.description}
                className="w-10 h-10 mx-auto"
              />
              <div className="font-semibold text-gray-800">{Math.round(forecast.main.temp)}°C</div>
              <div className="text-xs text-gray-500 capitalize">{forecast.weather[0]?.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard; 