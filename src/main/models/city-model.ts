import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

class City extends Model {
  declare id: number
  declare type_region: string
  declare region: string
  declare city: string
  declare lower_city: string
  declare latitude: number | null
  declare longitude: number | null
  declare population: number | null
  declare utc: string | null
}

City.init(
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
    modelName: 'City',
    tableName: 'cities',
    timestamps: false
  }
)

export default City
