import { sample } from 'effector'
import { createGate, useGate, useStoreMap, useUnit } from 'effector-react'
import { FC } from 'react'
import { useNavigate, useParams } from 'react-router'

import { $news, firstFetchNews } from '@entities/news'

import { Button } from '@shared/ui'

const Gate = createGate()
sample({
  clock: Gate.open,
  target: []
})

export const NewsDetail: FC = () => {
  useGate(Gate)
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const selectedNews = useStoreMap({
    store: $news,
    keys: [slug],
    fn: (store, [slug]) => store.find((item) => item.slug === slug)
  })

  const handleGoBack = () => {
    navigate(-1)
  }

  if (!selectedNews) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-gray-900">Новость не найдена</h1>
        <p className="mt-2 text-gray-600">Проверьте URL или вернитесь к списку новостей.</p>
        <Button onClick={handleGoBack} variant="outline" className="mt-4">
          Назад
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold text-gray-900">{selectedNews.title}</h1>
      <p className="text-sm text-gray-600">Дата: {selectedNews.pubDate}</p>
      <p className="text-sm text-gray-600">Автор: {selectedNews.creator || 'Не указан'}</p>
      <p className="text-sm text-gray-600">Категория: {selectedNews.category || 'Не указана'}</p>
      {selectedNews.media?.contentUrl && (
        <img
          src={selectedNews.media.contentUrl}
          alt={selectedNews.media.credit || selectedNews.title}
          className="my-4 h-64 w-full rounded-md object-cover"
        />
      )}
      <div className="text-base text-gray-900">
        {selectedNews.content.map((node, index) => (
          <p key={index}>{node.text || 'Нет описания'}</p>
        ))}
      </div>
      <Button onClick={handleGoBack} variant="outline" className="mt-4 w-fit">
        Назад
      </Button>
    </div>
  )
}
