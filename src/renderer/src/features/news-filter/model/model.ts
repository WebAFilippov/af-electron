import { createEvent, restore } from 'effector'

const toggleIsOpen = createEvent<boolean>()

const $isOpen = restore(toggleIsOpen, false)

export { $isOpen, toggleIsOpen }

$isOpen.watch((open) => console.log(`#open-popover ${open}`))
