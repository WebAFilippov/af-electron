import { createStore } from 'effector'

import { News } from '../types/news'

const $news = createStore<News[]>([])

export { $news }

// $news.watch((news) => console.log('#news ', news))
