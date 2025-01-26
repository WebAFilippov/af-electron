import { createEvent, createStore } from 'effector'

export const setOWMApikey = createEvent<string>()
export const $ownApikey = createStore<string>('')

$ownApikey.on(setOWMApikey, (_state, payload) => payload)
