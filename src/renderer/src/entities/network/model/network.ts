import { createEvent, restore } from 'effector'

window.api.networkState((state) => {
  setNetworkState(state)
})

const setNetworkState = createEvent<boolean>()

const $isNetwork = restore(setNetworkState, false)

export { $isNetwork }
