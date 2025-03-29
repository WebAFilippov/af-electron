import { createEffect, createEvent, createStore, sample } from 'effector'

type UpdatedStatus =
  | 'checking-for-update'
  | 'update-available'
  | 'update-not-available'
  | 'error'
  | 'update-downloaded'
  | 'update-cancelled'
  | 'download-progress'
  | null

type UpdateData = Record<string, any> | null

window.api.onUpdateData((data) => {
  setUpdateStatus(data.status)
  data.data ? setUpdateData(data.data) : setUpdateData(null)
})

const startDowloadFx = createEffect(() => window.api.startUpdate())
const installNowFx = createEffect(() => window.api.installNow())
const installOnQuitFx = createEffect(() => window.api.installOnQuit())

const setUpdateStatus = createEvent<UpdatedStatus>()
const resetUpdateStatus = createEvent()

const setUpdateData = createEvent<UpdateData>()
const startUpdate = createEvent()
const installNow = createEvent()
const installOnQuit = createEvent()

const $updateStatus = createStore<UpdatedStatus>('error').reset(resetUpdateStatus)
const $updateData = createStore<UpdateData>(null)
const $isDowloading = startDowloadFx.pending

sample({
  clock: setUpdateStatus,
  target: $updateStatus
})

sample({
  clock: setUpdateData,
  target: $updateData
})

sample({
  clock: startUpdate,
  source: $isDowloading,
  filter: (pending) => !pending,
  target: startDowloadFx
})

sample({
  clock: installNow,
  target: [installNowFx, resetUpdateStatus]
})

sample({
  clock: installOnQuit,
  target: [installOnQuitFx, resetUpdateStatus]
})

export { $updateStatus, $updateData, $isDowloading, startUpdate, installNow, installOnQuit }
