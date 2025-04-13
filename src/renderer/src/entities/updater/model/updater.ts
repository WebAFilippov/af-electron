import { createEffect, createEvent, createStore, sample } from 'effector'

type UpdatedStatus =
  | 'checking-for-update'
  | 'update-available'
  | 'update-not-available'
  | 'update-downloaded'
  | 'download-progress'
  | 'error'
  | null

type UpdateData = Record<string, any> | null

window.api.onUpdateData((data) => {
  setUpdateStatus(data.status)
  data.data ? setUpdateData(data.data) : setUpdateData(null)
})

const startDownloadFx = createEffect(() => window.api.startDownload())
const installNowFx = createEffect(() => window.api.installNow())
const installOnQuitFx = createEffect(() => window.api.installOnQuit())

const setUpdateStatus = createEvent<UpdatedStatus>()
const resetUpdateStatus = createEvent()

const setUpdateData = createEvent<UpdateData>()
const startDownload = createEvent()
const installNow = createEvent()
const installOnQuit = createEvent()

const $updateStatus = createStore<UpdatedStatus>(null).reset(resetUpdateStatus)
const $updateData = createStore<UpdateData>(null)
const $isDowloading = startDownloadFx.pending
const $isActiveStateUpdater = $updateStatus.map((status) => status !== null)

sample({
  clock: setUpdateStatus,
  target: $updateStatus
})

sample({
  clock: setUpdateData,
  target: $updateData
})

sample({
  clock: startDownload,
  source: $isDowloading,
  filter: (pending) => !pending,
  target: startDownloadFx
})

sample({
  clock: installNow,
  target: [installNowFx, resetUpdateStatus]
})

sample({
  clock: installOnQuit,
  target: [installOnQuitFx, resetUpdateStatus]
})

export {
  $updateStatus,
  $updateData,
  $isDowloading,
  $isActiveStateUpdater,
  startDownload,
  installNow,
  installOnQuit
}

$updateStatus.watch((state) => console.log('#update status: ', state))
