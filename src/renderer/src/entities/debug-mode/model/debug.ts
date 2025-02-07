import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { DEBUG_KEYBOARD_SHORTCUT, DEBUG_MODE_STORAGE_KEY } from '@shared/config/constant'

export interface DebugLayerInfo {
  enabled: boolean
  layer: 'app' | 'processes' | 'widgets' | 'features' | 'entities' | 'pages' | 'shared' | 'unknown'
  type: 'solid' | 'dashed' | 'dotted' | 'double'
  color: string
}

const KeyDownToWindow = (event: KeyboardEvent) => {
  if (event.ctrlKey && DEBUG_KEYBOARD_SHORTCUT.includes(event.key)) {
    toggleDebug()
  }
}

const addListenerDebugFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToWindow)
})
const removeListenerDebugFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToWindow)
})

const setDebugLayerOption = createEvent<{
  layer: DebugLayerInfo['layer']
  option: DebugLayerInfo
}>()
const toggleDebug = createEvent()

const $debug = createStore(false)
const $debugMenu = createStore<DebugLayerInfo[]>([
  {
    enabled: true,
    layer: 'app',
    type: 'solid',
    color: '#E2D5F5'
  },
  {
    enabled: true,
    layer: 'processes',
    type: 'solid',
    color: '#C0DFFD'
  },
  {
    enabled: true,
    layer: 'widgets',
    type: 'solid',
    color: '#DAF7DF'
  },
  {
    enabled: true,
    layer: 'features',
    type: 'solid',
    color: '#FDFCD7'
  },
  {
    enabled: true,
    layer: 'entities',
    type: 'solid',
    color: '#FCE1C0'
  },
  {
    enabled: true,
    layer: 'pages',
    type: 'solid',
    color: '#DDF9FF'
  },
  {
    enabled: true,
    layer: 'shared',
    type: 'solid',
    color: '#FDD6D7'
  },

  { enabled: true, layer: 'unknown', type: 'solid', color: '#FC5912' }
])

persist({
  store: $debugMenu,
  key: DEBUG_MODE_STORAGE_KEY
})

sample({
  clock: setDebugLayerOption,
  source: $debugMenu,
  fn: (store, { layer, option }) => store.map((item) => (item.layer === layer ? option : item)),
  target: $debugMenu
})

sample({
  clock: toggleDebug,
  source: $debug,
  fn: (store) => !store,
  target: $debug
})

$debug.watch((store) => console.log('#debug ', store))
$debugMenu.watch((store) => console.log('#debugMenu ', store))

export { $debug, $debugMenu, addListenerDebugFx, removeListenerDebugFx, setDebugLayerOption }
