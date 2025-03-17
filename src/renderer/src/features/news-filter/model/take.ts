import { createEvent, restore } from 'effector'

const TAKE_OPTIONS: number[] = [10, 25, 50]

const setTake = createEvent<number>()

const $take = restore(setTake, 25)

export { TAKE_OPTIONS, $take, setTake }

$take.watch((take) => console.log('#take', take))
