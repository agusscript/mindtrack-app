export interface IWeather {
  temperature: number;
  wind: number;
  humidity: number;
  description: string;
  weatherCode: number;
}

export interface IOpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  current_weather_units?: {
    relativehumidity_2m?: number;
  };
}

