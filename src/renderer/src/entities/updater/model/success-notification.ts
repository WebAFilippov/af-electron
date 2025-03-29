import { createEvent, restore } from 'effector'

window.api.onSuccessUpdate((version) => {
  setSuccessNotification(version)
})

const setSuccessNotification = createEvent<string>()
const resetSuccessNotification = createEvent()

const $successNotification = restore(setSuccessNotification, '').reset(resetSuccessNotification)

export { $successNotification, resetSuccessNotification, setSuccessNotification }
