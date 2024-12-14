import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

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

export type ApplicationField = keyof Pick<Application, 'id' | 'openweathermap_apikey'>
export type TApplication = Pick<Application, 'id' | 'openweathermap_apikey'>
