import { sample } from 'effector'
import { createGate, useGate, useStoreMap } from 'effector-react'
import { ChevronsLeft } from 'lucide-react'
import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { NotFound404 } from '@pages/not-found'

import { Button, ProgressiveImage } from '@shared/ui'

// const Gate = createGate()
// sample({
//   clock: Gate.open,
//   target: [fetchNewsFx.start]
// })

export const NewsDetail: FC = () => {
  // useGate(Gate)
  // const navigate = useNavigate()
  // const { slug } = useParams<{ slug: string }>()

  // const selectedNews = useStoreMap({
  //   store: $news,
  //   keys: [slug],
  //   fn: (store, [slug]) => store.find((item) => item.slug === slug)
  // })

  // const handleGoBack = () => {
  //   navigate(-1)
  // }

  // if (!selectedNews) {
  //   return <NotFound404 />
  // }

  return (
    <div className="relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden">
      news detailed
      {/* <div className="sticky top-0 z-30 flex space-x-4 rounded-tl-2xl border-b border-border bg-card/65 backdrop-blur-xl">
        <Button
          variant="ghost"
          className="h-full w-16 rounded-none rounded-tl-2xl border-r border-border"
          onClick={handleGoBack}
        >
          <ChevronsLeft className="h-8 w-8" strokeWidth={2} />
        </Button>
        <div className="space-y-1 py-3 pr-8">
          <h1 className="w-full text-3xl font-bold leading-7 text-card-foreground">
            {selectedNews.title}
          </h1>
          <div className="w-full divide-x divide-dotted divide-card-foreground/50">
            <span className="pr-2 text-sm italic tracking-tighter text-muted-foreground">
              {formatRelativeDate(selectedNews.pubDate)}
            </span>
            <span className="px-2 text-sm italic tracking-tighter text-muted-foreground">
              {selectedNews.category || 'Не указана'}
            </span>
            <span className="pl-2 text-sm italic tracking-tighter text-muted-foreground">
              {selectedNews.creator || 'Не указан'}
            </span>
          </div>
        </div>
      </div>

      <div className="w-9/12 items-center self-center py-3">
        
        {selectedNews.content.map((node, index) => {
          if (node.tag === 'p') {
            return (
              <p
                key={index}
                className="mb-4 text-wrap text-justify indent-3 text-base text-card-foreground"
              >
                {node.text}
              </p>
            )
          }

          return null
        })}
        <p className="mr-5 mt-2 text-right text-base font-bold italic text-foreground">
          Источник: <span className="cursor-pointer not-italic">Lenta.ru</span>
        </p>
      </div> */}
    </div>
  )
}
