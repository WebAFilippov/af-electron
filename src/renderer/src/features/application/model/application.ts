import { createEffect } from 'effector'

const KeyDownToWindow = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    window.api.setMaximazeWindow()
  }
}

const addListenerWindowFx = createEffect(() => {
  window.addEventListener('keydown', KeyDownToWindow)
})
const removeListenerWindowFx = createEffect(() => {
  window.removeEventListener('keydown', KeyDownToWindow)
})

export { addListenerWindowFx, removeListenerWindowFx }
