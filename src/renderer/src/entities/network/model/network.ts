import { createEvent, restore } from 'effector'

window.api.checkNetworkStatus((state) => {
  setNetworkStatus(state)
})

const setNetworkStatus = createEvent<boolean>()

const $isNetwork = restore(setNetworkStatus, false)

export { $isNetwork }

// $isNetwork.watch((state) => console.log('network status: ', state))
