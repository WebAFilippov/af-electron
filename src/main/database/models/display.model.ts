import { sequelize } from '@database/database'
import { Point, Rectangle, Size } from 'electron'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

interface Display {
  accelerometerSupport: 'available' | 'unavailable' | 'unknown'
  bounds: {
    height: number
    width: number
    x: number
    y: number
  }
  colorDepth: number
  colorSpace: string
  depthPerComponent: number
  detected: boolean
  displayFrequency: number
  dispayId: number
  internal: boolean
  label: string
  maximumCursorSize: {
    height: number
    width: number
  }
  monochrome: boolean
  nativeOrigin: {
    x: number
    y: number
  }
  rotation: number
  scaleFactor: number
  size: {
    height: number
    width: number
  }
  touchSupport: 'available' | 'unavailable' | 'unknown'
  workArea: {
    height: number
    width: number
    x: number
    y: number
  }
  workAreaSize: {
    height: number
    width: number
  }
  typeLed?: 'WS2815' | 'WS2812'
  channelId?: 0 | 1 | 2
  colorOrder?: 'RGB' | 'BGR'
  gamma?: number
  quality?: number
  entries: {
    id: number
    side: 'top' | 'right' | 'bottom' | 'left'
    offset: number
    length: number
    thickness: number
    leds: number
    direction: 'cw' | 'ccw'
    x: number
    y: number
    w: number
    h: number
  }[]
}

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

export class Display1 extends Model<InferAttributes<Display>, InferCreationAttributes<Display>> {
  declare id: CreationOptional<number>
  declare theme: 'dark' | 'light'
  declare version: string
}

export type ProgramModel = InferCreationAttributes<Display>

Display.init(
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
    version: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Program',
    tableName: 'program',
    timestamps: false
  }
)

export default Display
