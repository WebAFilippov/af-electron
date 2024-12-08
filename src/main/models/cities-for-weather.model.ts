import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

import City from './city.model'

class CitiesForWeather extends Model {
  declare id: number
  declare cityId: number
  declare isSelected: boolean
}

CitiesForWeather.init(
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
    isSelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'CitiesForWeather',
    tableName: 'cities_for_weather',
    timestamps: false
  }
)

City.hasOne(CitiesForWeather, {
  foreignKey: 'cityId',
  as: 'citiesInfo',
  onDelete: 'SET NULL'
})

CitiesForWeather.belongsTo(City, {
  foreignKey: 'cityId',
  as: 'city',
  onDelete: 'SET NULL'
})

export default CitiesForWeather
