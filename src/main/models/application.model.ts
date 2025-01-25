import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { sequelize } from '@database/database'

export interface IApplication {
  id: number
  owm_apikey: string
}

class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<number>
  declare owm_apikey: string
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    owm_apikey: {
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
