import { useEffect, useState } from 'react'

// Интерфейс для структуры медиа-данных
interface MediaData {
  thumbnailUrl: string
  credit: string
  title: string
}

// Интерфейс для узла контента
interface ContentNode {
  text: string
  [key: string]: any // Для совместимости с остальными полями content
}

// Интерфейс для объекта новости
interface NewsItem {
  title: string
  link: string
  pubDate: string
  category: string
  creator: string
  media: MediaData
  content: ContentNode[]
}

export const HomePage = () => {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    window.api
      .fetchNews()
      .then((items: NewsItem[]) => {
        setNews(items)
      })
      .catch((error: Error) => console.error(error))
  }, [])

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Новости</h1>
        <ul className="space-y-3">
          {news.map((item, index) => (
            <li
              key={index}
              className="flex min-h-[120px] items-start rounded-lg border border-input bg-secondary shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {item.media?.thumbnailUrl ? (
                <div className="m-3 h-24 w-24 flex-shrink-0">
                  <img
                    src={item.media.thumbnailUrl}
                    alt={item.media.credit || item.title}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>
              ) : (
                <div className="m-3 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md bg-gray-200">
                  <span className="text-sm font-medium text-gray-500">Нет фото</span>
                </div>
              )}
              <div className="flex-1 py-3 pr-3">
                <h3 className="line-clamp-2 text-base font-semibold text-foreground transition-colors hover:text-blue-700">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <div className="mt-1 space-y-0.5 text-xs text-foreground">
                  <p className="line-clamp-2 font-medium">
                    {item.content[0]?.text || ''}
                  </p>
                  <p>
                    <span className="font-medium">Категория:</span>{' '}
                    {item.category || 'Не указана'}
                  </p>
                  <p>
                    <span className="font-medium">Автор:</span> {item.creator || 'Не указан'}
                  </p>
                  <p>
                    <span className="font-medium">Дата:</span>{' '}
                    {new Date(item.pubDate).toLocaleString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Читать далее →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}