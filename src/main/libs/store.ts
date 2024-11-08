import Store from 'electron-store'

interface IStore {}
export const setupStore = (isAutoLaunch: boolean = false) => {
  return new Store<IStore>({
    name: 'settings',
    defaults: {
      theme: 'system',
      isHide: isAutoLaunch ? true : false,
      isMinisize: false,
      isMaximaze: false
    }
  })
}
