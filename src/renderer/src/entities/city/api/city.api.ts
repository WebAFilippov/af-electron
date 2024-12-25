import { useQuery } from '@tanstack/react-query'

import { CityWeather, Weather } from '../model/types'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const fetchWeather = async (
  apikey: string,
  latitude: number,
  longitude: number
): Promise<Weather> => {
  const response = await fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=ru`
  )

  if (!response.ok) {
    throw new Error('Error fetching weather data')
  }

  const data = await response.json()
  if (data) return data

  throw new Error('Error parsing weather data')
}

const fetchAllWeather = async (apikey: string, cities: CityWeather[]): Promise<CityWeather[]> => {
  const weatherPromises = cities.map(async (city) => {
    try {
      const { latitude, longitude } = city.cityInfo
      const weather = await fetchWeather(apikey, latitude, longitude)
      return { ...city, weather }
    } catch (error) {
      return { ...city, weather: undefined }
    }
  })

  return Promise.all(weatherPromises)
}

const useCitiesWeather = (apikey: string, cities: CityWeather[]) => {
  return useQuery({
    queryKey: ['allWeather'],
    queryFn: () => fetchAllWeather(apikey, cities),
    enabled: !!apikey && !!cities.length,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 0
  })
}

export { fetchWeather, fetchAllWeather, useCitiesWeather }
