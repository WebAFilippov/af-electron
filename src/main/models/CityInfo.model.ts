import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { sequelize } from '@database/database'

export interface ICityInfo {
  id: number
  type_region: string
  region: string
  city: string
  lower_city: string
  latitude: number
  longitude: number
  population: number
  utc: string
}

class CityInfo extends Model<InferAttributes<CityInfo>, InferCreationAttributes<CityInfo>> {
  declare id: CreationOptional<number>
  declare type_region: string
  declare region: string
  declare city: string
  declare lower_city: string
  declare latitude: number
  declare longitude: number
  declare population: number
  declare utc: string
}

CityInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type_region: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lower_city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: true
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    utc: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'CityInfo',
    tableName: 'cityInfo',
    timestamps: false
  }
)

export default CityInfo
