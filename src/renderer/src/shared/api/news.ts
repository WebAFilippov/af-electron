import { createEffect } from 'effector'



const fetchNewsFx = createEffect(() => {
  return window.api.fetchNews()
})

export { fetchNewsFx }
