import { createEffect, createEvent, sample } from 'effector'

export const AppStarted = createEvent()

const StartUpFx = createEffect(async () => {
  await window.api.onStartup()
})

sample({
  clock: AppStarted,
  target: StartUpFx
})
