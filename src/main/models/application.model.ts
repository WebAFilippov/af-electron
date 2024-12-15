import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

export interface IApplication {
  id: number
  openweathermap_apikey: string
  theme: 'system' | 'dark' | 'light'
}

class Application extends Model {
  declare id: number
  declare openweathermap_apikey: string
  declare theme: 'system' | 'dark' | 'light'
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
    theme: {
      type: DataTypes.ENUM('system', 'dark', 'light'), 
      allowNull: false,
      defaultValue: 'system' 
    }
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'application',
    timestamps: false
  }
)

export default Application
