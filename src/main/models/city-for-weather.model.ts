import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

import City, { TCity } from './city.model'

class CityForWeather extends Model {
  declare id: number
  declare cityId: number
  declare isDefault: boolean
}

CityForWeather.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: City,
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'CityForWeather',
    tableName: 'city_for_weather',
    timestamps: false
  }
)

City.hasOne(CityForWeather, {
  foreignKey: 'cityId',
  as: 'cityInfo',
  onDelete: 'SET NULL'
})

CityForWeather.belongsTo(City, {
  foreignKey: 'cityId',
  as: 'cityInfo',
  onDelete: 'SET NULL'
})

export default CityForWeather

export type TCityForWeather = Pick<CityForWeather, 'id' | 'cityId' | 'isDefault'>
export type TCityForWeatherWithCityInfo = TCityForWeather & { cityInfo: TCity }
