import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@database/database'

import CityInfo, { ICityInfo } from './cityInfo'

export interface ICity {
  id: number
  cityId: number
  isDefault: boolean
}

export interface ICityWithCityInfo extends ICity {
  cityInfo: ICityInfo
}

class City extends Model {
  declare id: number
  declare cityId: number
  declare isDefault: boolean
}

City.init(
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
        model: CityInfo,
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
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
  foreignKey: 'cityId',
  as: 'cityInfo',
  onDelete: 'SET NULL'
})

CityInfo.hasOne(City, {
  foreignKey: 'cityId',
  as: 'cityInfo',
  onDelete: 'CASCADE'
})

export default City
