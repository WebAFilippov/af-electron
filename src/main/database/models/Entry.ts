import { sequelize } from './../db'

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export class Entry extends Model<InferAttributes<Entry>, InferCreationAttributes<Entry>> {
  declare id: CreationOptional<number>
  declare side: 'top' | 'right' | 'bottom' | 'left'
  declare offset: number
  declare length: number
  declare thickness: number
  declare leds: number
  declare direction: 'cw' | 'ccw'
  declare x: number
  declare y: number
  declare w: number
  declare h: number
  declare displayId: number
}

Entry.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    side: DataTypes.ENUM('top', 'right', 'bottom', 'left'),
    offset: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    thickness: DataTypes.INTEGER,
    leds: DataTypes.INTEGER,
    direction: DataTypes.ENUM('cw', 'ccw'),
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    w: DataTypes.INTEGER,
    h: DataTypes.INTEGER,
    displayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'displays', key: 'displayId' },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'entries',
    timestamps: true
  }
)

export default Entry
