import { createApi, createStore } from 'effector'

interface Cursor {
  sizes: number
  offsetX: number
  offsetY: number
}

export const $cursor = createStore<Cursor>({
  sizes: 26,
  offsetX: 18,
  offsetY: 42
})

export const { setCursor, resetCursor } = createApi($cursor, {
  setCursor: (_state, payload: Cursor) => payload,
  resetCursor: () => $cursor.defaultState
})
