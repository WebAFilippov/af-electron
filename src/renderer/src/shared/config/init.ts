import { checkForUpdateFx } from '@entities/updater'
import { createEvent, sample } from 'effector'

export const AppStarted = createEvent()

sample({
  clock: AppStarted,
  target: [checkForUpdateFx]
})
