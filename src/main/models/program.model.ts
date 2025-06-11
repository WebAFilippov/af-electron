import { sequelize } from '@database/database'
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export class Program extends Model<InferAttributes<Program>, InferCreationAttributes<Program>> {
  declare id: CreationOptional<number>
  declare theme: 'dark' | 'light'
  declare version: string
}

export type ProgramModel = InferCreationAttributes<Program>

Program.init(
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

export default Program
