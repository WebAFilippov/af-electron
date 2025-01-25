import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { sequelize } from '@database/database'

import CityInfo from './CityInfo.model'

export interface ICity {
  id: number
  cityInfoId: number
  default: boolean
  order: number
  cityInfo: CityInfo
}

class City extends Model<InferAttributes<City>, InferCreationAttributes<City>> {
  declare id: CreationOptional<number>
  declare cityInfoId: ForeignKey<number>
  declare default: boolean
  declare order: number
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cityInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: CityInfo,
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    order: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'City',
    tableName: 'city',
    timestamps: false
  }
)

City.belongsTo(CityInfo, {
  foreignKey: 'cityInfoId',
  as: 'cityInfo',
  onDelete: 'SET NULL'
})

CityInfo.hasOne(City, {
  foreignKey: 'cityInfoId',
  as: 'cityInfo',
  onDelete: 'CASCADE'
})

export default City
