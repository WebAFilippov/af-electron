import { Display } from "electron"

export interface DisplayInfo {
  index: number
  label: string
  isPrimary: boolean
  bounds: Electron.Rectangle
  scaleFactor: number
  rotation: number
}