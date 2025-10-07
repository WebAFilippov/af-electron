import { screen } from 'electron'

/**
 * Тип данных для представления информации о дисплее.
 */
type Displays = {
  /** Уникальный идентификатор дисплея (номер, который возвращает Electron) */
  id: number

  /** Название дисплея (например, 'SyncMaster', 'SAMSUNG') */
  label: string

  /** Флаг, указывающий, является ли дисплей основным (primary) */
  primary: boolean

  /** Флаг, указывающий, встроенный это дисплей (например, экран ноутбука) */
  internal: boolean

  /** Масштаб дисплея (scaleFactor). Используется для HiDPI дисплеев */
  scale: number

  /** Поворот дисплея в градусах (0, 90, 180, 270) */
  rotation: number

  /** Частота обновления дисплея (в герцах) */
  fps: number

  /** Смещение дисплея относительно глобального пространства рабочего стола */
  offset: {
    /** смещение по горизонтали (с учётом scale) */
    x: number // смещение по горизонтали (с учётом scale)
    /** смещение по вертикали (с учётом scale) */
    y: number // смещение по вертикали (с учётом scale)
  }

  /** Фактический размер дисплея с учётом масштабирования */
  size: {
    width: number // ширина в пикселях (умножена на scale)
    height: number // высота в пикселях (умножена на scale)
  }
}

/**
 * Функция возвращает массив объектов с полной информацией о всех подключённых дисплеях.
 * @returns {Displays[]} Массив дисплеев с физическими размерами, смещениями и дополнительными параметрами.
 */
const getPhysicalDisplays = (): Displays[] => {
  const displays = screen.getAllDisplays()
  const primaryDisplay = screen.getPrimaryDisplay()

  return displays.map((display) => {
    return {
      id: display.id,
      label: display.label,
      primary: display.id === primaryDisplay.id,
      internal: display.internal,
      scale: display.scaleFactor,
      rotation: display.rotation,
      fps: display.displayFrequency,
      offset: {
        x: display.nativeOrigin.x * display.scaleFactor,
        y: display.nativeOrigin.y * display.scaleFactor
      },
      size: {
        width: display.size.width * display.scaleFactor,
        height: display.size.height * display.scaleFactor
      }
    }
  })
}

export type { Displays }
export { getPhysicalDisplays }
