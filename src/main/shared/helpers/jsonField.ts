import { DataTypes } from 'sequelize'

export const jsonField = () => ({
  type: DataTypes.TEXT,
  get(this: any) {
    const raw = this.getDataValue(this.fieldName)
    return raw ? JSON.parse(raw) : null
  },
  set(this: any, value: any) {
    this.setDataValue(this.fieldName, JSON.stringify(value))
  }
})
