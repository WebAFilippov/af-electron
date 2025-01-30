import { createApi, createEvent, createStore, sample } from 'effector'

const checkNetworkStatus = createEvent()
const setNetworkStatus = createEvent()

const $networkStatus = createStore<boolean>(false)

const {} = createApi($networkStatus, {
  setNetworkStatus: (_store, status) => status
})


