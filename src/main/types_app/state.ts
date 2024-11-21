export interface IState {
  isHide: boolean
  isMinisize: boolean
  isMaximaze: boolean
  theme: 'dark' | 'light' | 'system'
}

export enum ThemeColorBackground {
  DARK = '#1e8c16',
  LIGHT = '#de4343'
}
