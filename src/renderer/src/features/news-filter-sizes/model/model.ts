import { createEvent, createStore, restore } from 'effector'

type Size = 10 | 20 | 30

const setSize = createEvent<Size>()

const $sizes = createStore([10, 20, 30])
const $currentSize = restore<Size>(setSize, 10)

export { $sizes, $currentSize, setSize }

$sizes.watch((size) => console.log(`#sizes ${size}`))
