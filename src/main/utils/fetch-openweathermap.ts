import { Weather } from '@main/shared/types'

import axios from './../../../node_modules/axios/lib/axios'

export const getWeatherByCoordinates = async (
  latitude: number,
  longitude: number,
  apikey: string
): Promise<Weather> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`Ошибка получения погоды для координат (${latitude}, ${longitude}):`, error)
    throw error
  }
}
