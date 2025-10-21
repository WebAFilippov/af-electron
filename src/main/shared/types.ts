export interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

export type Theme = 'light' | 'dark'

export enum ThemeColorBackground {
  DARK = '#000000',
  LIGHT = '#ffffff'
}
