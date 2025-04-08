import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const { name, main, weather, wind } = data;
  const icon = weather[0]?.icon;
  const description = weather[0]?.description;
  const weatherMain = weather[0]?.main;
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <div className="flex items-center">
            <img 
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
              alt={description}
              className="w-16 h-16"
            />
            <span className="text-3xl font-bold text-gray-800 ml-2">
              {Math.round(main.temp)}°C
            </span>
          </div>
        </div>
        
        <div className="text-gray-600 capitalize mb-4">
          {description}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="text-gray-500 text-sm">Humidity</div>
            <div className="text-lg font-semibold">{main.humidity}%</div>
          </div>
          
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="text-gray-500 text-sm">Wind Speed</div>
            <div className="text-lg font-semibold">{wind.speed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 