import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCityForWeatherBySelected } from '@entities/city'

import { Button } from '@shared/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@shared/components/ui/card'
import { ROUTE } from '@shared/config/routes'
import { useAppSelector } from '@shared/hooks'

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const CityForWeatherSelected = useAppSelector(getCityForWeatherBySelected)

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log('update weather-card-home fetch')
      if (CityForWeatherSelected) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CityForWeatherSelected?.cityInfo.city}&appid=0e9abf6e9d1e571719e3fed8d179a7e9&units=metric`
          )
          const data = await response.json()
          setWeatherData(data)
        } catch (error) {
          console.error('Error fetching weather data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchWeatherData()
  }, [CityForWeatherSelected])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!weatherData) {
    return <div>Error loading weather data.</div>
  }

  const { main, weather, name } = weatherData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Погода в {name && name}</CardTitle>
        <CardDescription>
          Температура: {main.temp && main.temp}°C, {weather && weather[0].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Влажность: {main && main.humidity}%</p>
        <p>Давление: {main && main.pressure} hPa</p>
      </CardContent>
      <CardFooter>
        <Link to={ROUTE.WEATHER.path} className="w-full">
          <Button>Показать подробности</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default WeatherCard
