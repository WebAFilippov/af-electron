interface WindowState {
  minimize: boolean
  maximize: boolean
  fullscreen: boolean
  show: boolean
}

type Theme = 'light' | 'dark' | 'system'

export type { WindowState, Theme }
