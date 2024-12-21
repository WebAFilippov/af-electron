type CityInfo = {
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
}

export interface SearchCitiesParams {
  query: string
  limit?: number
  order?: 'DESC' | 'ASC'
}

export type Application = {
  id: number
  openweathermap_apikey: string
  theme: 'system' | 'dark' | 'light'
}

export type PreloadApplication = Application

export type PreloadStartedPayload = {
  storeCity: CityForWeather[]
  storeApplication: Application
}
