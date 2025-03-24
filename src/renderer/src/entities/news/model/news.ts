import {  createStore } from 'effector'

import { CategoryNews } from '../types/news'

const $news = createStore<CategoryNews[]>([])

// const loadNewsFx = createEffect(async () => {
//   return await window.api.getNews()
// })

export { $news }
