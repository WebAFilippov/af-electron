import { createEvent, sample } from 'effector'
import { debounce } from 'patronum'

import { $news } from '@entities/news'

const updateScroll = createEvent<{ category: string; scroll: number }>()

const debouncedUpdateScroll = debounce({ source: updateScroll, timeout: 250 })

sample({
  clock: debouncedUpdateScroll,
  source: $news,
  fn: (news, { category, scroll }) =>
    news.map((item) => (item.category === category ? { ...item, scroll } : item)),
  target: $news
})

export { updateScroll }
