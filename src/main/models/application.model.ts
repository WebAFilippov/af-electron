import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { sequelize } from '@database/database'

export interface IApplication {
  theme: string
  owm_apikey: string
}

class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<number>
  declare theme: string
  declare owm_apikey: string
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false
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
