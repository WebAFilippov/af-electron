import { createEvent, restore, sample } from 'effector'

import { $windowShow } from '@entities/window'

window.api.checkNetworkStatus((state) => {
  setNetworkStatus(state)
})

const setNetworkStatus = createEvent<boolean>()

const $isNetwork = restore(setNetworkStatus, false)

sample({
  clock: $windowShow,
  filter: (state) => Boolean(state),
  target: setNetworkStatus
})

export { $isNetwork }

// $isNetwork.watch((state) => console.log('network status: ', state))
