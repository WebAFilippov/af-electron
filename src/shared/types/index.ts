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

export type CityWeather = {
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
}

export type PreloadApplication = Application

export type PreloadStartedPayload = {
  storeCity: CityWeather[]
  storeApplication: Application
}
