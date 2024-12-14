export type Weather = {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  snow: {
    '1h': number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type CityInfo = {
  id: number
  type_region: string
  region: string
  city: string
  lower_city: string
  latitude: number
  longitude: number
  population: number
  utc: string
}

export type CityForWeather = {
  id: number
  cityId: number
  isDefault: boolean
  cityInfo: CityInfo
  weather?: Weather
}

export interface SearchCitiesParams {
  query: string
  limit?: number
  order?: 'DESC' | 'ASC'
}

export type Application = {
  openWeatherMapApiKey: string
}

export type PreloadApplication = Application

export type PreloadStartedPayload = {
  storeCityForWeather: CityForWeather[]
  storeApplication: Application
}
