// src/db/models/index.ts
import Display from './Display'
import Entry from './Entry'

export const initModels = () => {
  // ассоциации: Display 1 -> N Entry по PK id
  Display.hasMany(Entry, {
    foreignKey: 'displayId',
    as: 'entries',
    onDelete: 'CASCADE',
    hooks: true
  })

  Entry.belongsTo(Display, {
    foreignKey: 'displayId',
    as: 'display'
  })
}

export { Display, Entry }
