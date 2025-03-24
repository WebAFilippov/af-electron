import { createEvent, sample } from 'effector'

import { $news } from '@entities/news'

const updateScroll = createEvent<{ category: string; scroll: number }>()

sample({
  clock: updateScroll,
  source: $news,
  fn: (news, { category, scroll }) =>
    news.map((item) => (item.category === category ? { ...item, scroll } : item)),
  target: $news
})

export { updateScroll }
