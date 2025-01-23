import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

import { sequelize } from '@database/database'

export interface IApplication {
  id: number
  OWM_APIKEY: string
}

class Application extends Model<InferAttributes<Application>, InferCreationAttributes<Application>> {
  declare id: CreationOptional<number>
  declare OWM_APIKEY: string
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    OWM_APIKEY: {
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
