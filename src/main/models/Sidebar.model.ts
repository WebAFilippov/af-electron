import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

import { sequelize } from '@database/database'

export interface ISidebar {
  id: number
  path: string
  order: number
  name: string
  icon: string
}

class Sidebar extends Model<
  InferAttributes<Sidebar>,
  InferCreationAttributes<Sidebar>
> {
  declare id: CreationOptional<number>
  declare path: string
  declare order: number
  declare name: string
  declare icon: string
}

Sidebar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'NavList',
    tableName: 'nav_list',
    timestamps: false
  }
)

export default Sidebar
