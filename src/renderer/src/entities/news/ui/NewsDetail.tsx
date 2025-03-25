import { FC } from 'react'

import { NewsItem } from '../types/news'

interface Props {
  news: NewsItem
}

export const NewsDetail: FC<Props> = ({ news }) => {
  return <>{news.creator?.name}</>
}
