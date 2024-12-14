import React from 'react';

export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  snow: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

interface WeatherProps {
  weather: Weather;
}

export const WeatherComponent: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '16px' }}>
      <h2>Weather in {weather.name}, {weather.sys.country}</h2>
      <p>
        <strong>Coordinates:</strong> ({weather.coord.lat}, {weather.coord.lon})
      </p>
      <p>
        <strong>Temperature:</strong> {weather.main.temp}°C (min: {weather.main.temp_min}°C, max: {weather.main.temp_max}°C)
      </p>
      <p>
        <strong>Feels Like:</strong> {weather.main.feels_like}°C
      </p>
      <p>
        <strong>Pressure:</strong> {weather.main.pressure} hPa (sea level: {weather.main.sea_level} hPa, ground level: {weather.main.grnd_level} hPa)
      </p>
      <p>
        <strong>Humidity:</strong> {weather.main.humidity}%
      </p>
      <p>
        <strong>Weather:</strong> {weather.weather[0].main} - {weather.weather[0].description}
      </p>
      <p>
        <strong>Wind:</strong> {weather.wind.speed} m/s, direction {weather.wind.deg}°
      </p>
      <p>
        <strong>Visibility:</strong> {weather.visibility} m
      </p>
      <p>
        <strong>Cloudiness:</strong> {weather.clouds.all}%
      </p>
      <p>
        <strong>Snow (1h):</strong> {weather.snow['1h']} mm
      </p>
      <p>
        <strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
      </p>
      <p>
        <strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
      </p>
      <p>
        <strong>Timezone:</strong> {weather.timezone / 3600} hours from UTC
      </p>
      <p>
        <strong>Data Time:</strong> {new Date(weather.dt * 1000).toLocaleString()}
      </p>
    </div>
  );
};