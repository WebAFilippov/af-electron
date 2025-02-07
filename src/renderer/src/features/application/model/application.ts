import { createEffect } from 'effector'

import { DEBUG_KEYBOARD_SHORTCUT } from '@shared/config/constant'

const KeyDownToWindow = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    window.api.setMaximazeWindow()
  }

  if (event.ctrlKey && DEBUG_KEYBOARD_SHORTCUT.includes(event.key)) {
    
  }
}

const addListenerWindowFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToWindow)
})
const removeListenerWindowFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToWindow)
})

export { addListenerWindowFx, removeListenerWindowFx }
