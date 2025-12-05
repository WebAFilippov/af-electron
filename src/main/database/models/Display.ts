
import { jsonField } from '@shared/helpers/jsonField'
import { sequelize } from './../db'

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export class Display extends Model<InferAttributes<Display>, InferCreationAttributes<Display>> {
  declare id: CreationOptional<number>
  declare accelerometerSupport: 'available' | 'unavailable' | 'unknown'
  declare bounds: any
  declare colorDepth: number | null
  declare colorSpace: string | null
  declare depthPerComponent: number | null
  declare detected: boolean | null
  declare displayFrequency: number | null
  declare displayId: number
  declare internal: boolean | null
  declare label: string | null
  declare maximumCursorSize: any
  declare monochrome: boolean | null
  declare nativeOrigin: any
  declare rotation: number | null
  declare scaleFactor: number | null
  declare size: any
  declare touchSupport: 'available' | 'unavailable' | 'unknown' | null
  declare workArea: any
  declare workAreaSize: any
  declare typeLed?: 'WS2815' | 'WS2812' | null
  declare channelId?: 0 | 1 | 2 | null
  declare colorOrder?: 'RGB' | 'BGR' | null
  declare gamma?: number | null
  declare quality?: number | null
}

Display.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    displayId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    accelerometerSupport: DataTypes.ENUM('available', 'unavailable', 'unknown'),
    colorDepth: DataTypes.INTEGER,
    colorSpace: DataTypes.STRING,
    depthPerComponent: DataTypes.INTEGER,
    detected: DataTypes.BOOLEAN,
    displayFrequency: DataTypes.FLOAT,
    internal: DataTypes.BOOLEAN,
    label: DataTypes.STRING,
    maximumCursorSize: jsonField(),
    monochrome: DataTypes.BOOLEAN,
    nativeOrigin: jsonField(),
    rotation: DataTypes.FLOAT,
    scaleFactor: DataTypes.FLOAT,
    bounds: jsonField(),
    size: jsonField(),
    touchSupport: DataTypes.ENUM('available', 'unavailable', 'unknown'),
    workArea: jsonField(),
    workAreaSize: jsonField(),
    typeLed: DataTypes.ENUM('WS2815', 'WS2812'),
    channelId: DataTypes.INTEGER,
    colorOrder: DataTypes.ENUM('RGB', 'BGR'),
    gamma: DataTypes.FLOAT,
    quality: DataTypes.INTEGER
  },
  {
    sequelize,
    tableName: 'displays',
    timestamps: true
  }
)

export default Display
