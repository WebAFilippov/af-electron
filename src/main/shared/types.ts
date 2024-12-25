
import City from '@models/cityInfo'

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

export type PCityWith = {
  id: number
  cityId: number
  isDefault: boolean
  cityInfo: Pick<
    City,
    | 'id'
    | 'type_region'
    | 'region'
    | 'city'
    | 'lower_city'
    | 'latitude'
    | 'longitude'
    | 'population'
    | 'utc'
  >
}


