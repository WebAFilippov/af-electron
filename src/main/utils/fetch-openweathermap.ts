import axios from './../../../node_modules/axios/lib/axios'

const cities = [
  {
    id: 1,
    cityId: 123,
    isDefault: 0,
    cityInfo: {
      id: 123,
      type_region: 'обл',
      region: 'Волгоградская',
      city: 'Волжский',
      lower_city: 'волжский',
      latitude: 48.8,
      longitude: 44.75,
      population: 314436,
      utc: 'UTC+3'
    }
  },
  {
    id: 2,
    cityId: 321,
    isDefault: 0,
    cityInfo: {
      id: 321,
      type_region: 'обл',
      region: 'Кемеровская',
      city: 'Мыски',
      lower_city: 'мыски',
      latitude: 53.71,
      longitude: 87.81,
      population: 43029,
      utc: 'UTC+7'
    }
  },
  {
    id: 3,
    cityId: 666,
    isDefault: 0,
    cityInfo: {
      id: 666,
      type_region: 'обл',
      region: 'Оренбургская',
      city: 'Сорочинск',
      lower_city: 'сорочинск',
      latitude: 52.43,
      longitude: 53.15,
      population: 30136,
      utc: 'UTC+5'
    }
  },
  {
    id: 4,
    cityId: 999,
    isDefault: 1,
    cityInfo: {
      id: 999,
      type_region: 'Респ',
      region: 'Удмуртская',
      city: 'Сарапул',
      lower_city: 'сарапул',
      latitude: 56.46,
      longitude: 53.8,
      population: 101390,
      utc: 'UTC+4'
    }
  }
]

const API_KEY = '0e9abf6e9d1e571719e3fed8d179a7e9' // Замените на ваш API-ключ

// Функция для получения погоды по координатам
const getWeatherByCoordinates = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

  try {
    const response = await axios.get(url)
    return response.data // Возвращаем данные погоды
  } catch (error) {
    console.error(`Ошибка получения погоды для координат (${latitude}, ${longitude}):`, error)
    throw error
  }
}

export const getWeatherForAllCities = async () => {
  const weatherResults = await Promise.all(
    cities.map(async (city) => {
      const { latitude, longitude } = city.cityInfo
      const weather = await getWeatherByCoordinates(latitude, longitude)
      return {
        city: city.cityInfo.city,
        weather: {
          temperature: weather.main.temp,
          description: weather.weather[0].description,
          humidity: weather.main.humidity
        }
      }
    })
  )

  return weatherResults
}

// Получаем данные
