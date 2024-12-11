import CitiesForWeather from '@models/cities-for-weather.model'
import City from '@models/city.model'

class CitiesForWeatherRepository {
  async findAll(): Promise<CitiesForWeather[]> {
    return await CitiesForWeather.findAll({
      include: {
        model: City,
        as: 'city'
      },
      raw: true,
      nest: true
    })
  }

  async findById(id: number): Promise<CitiesForWeather | null> {
    return await CitiesForWeather.findByPk(id, {
      include: {
        model: City,
        as: 'city'
      },
      raw: true,
      nest: true
    })
  }

  async create(city: Omit<CitiesForWeather, 'id'>): Promise<CitiesForWeather> {
    return await CitiesForWeather.create(city)
  }

  async update(
    id: number,
    cityData: Omit<CitiesForWeather, 'id'>
  ): Promise<CitiesForWeather | null> {
    const [updatedRowsCount, updatedRows] = await CitiesForWeather.update(cityData, {
      where: { id },
      returning: true
    })

    if (updatedRowsCount === 0) {
      return null
    }

    return updatedRows[0]
  }

  async updateIsSelected(id: number, isSelected: boolean): Promise<CitiesForWeather | null> {
    const [updatedRowsCount, updatedRows] = await CitiesForWeather.update(
      { isSelected },
      {
        where: { id },
        returning: true
      }
    )

    if (updatedRowsCount === 0) {
      return null
    }

    return updatedRows[0]
  }
}

export const cityForWeatherRepository = new CitiesForWeatherRepository()
