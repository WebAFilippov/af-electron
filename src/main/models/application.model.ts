import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

export interface IApplication {
  id: number
  openweathermap_apikey: string
}

class Application extends Model {
  declare id: number
  declare openweathermap_apikey: string
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    openweathermap_apikey: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'application',
    timestamps: false
  }
)

export default Application
