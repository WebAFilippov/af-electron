import { FC } from 'react'

import { ProgressiveImage } from '@shared/ui'

import { NewsItem } from '../types/news'

interface Props {
  news: NewsItem
}

export const NewsDetail: FC<Props> = ({ news }) => {
  const externalLink = (link: string) => {
    window.api.openExternal(link)
  }

  console.log(news.content)

  // Функция для рендеринга узлов content
  const renderNode = (node: any, index: number) => {
    const key = `${node.tag}-${index}`

    switch (node.tag) {
      case 'p':
        return (
          <p
            key={key}
            className="mb-4 text-wrap text-justify indent-3 text-base text-card-foreground"
          >
            {node.root && !node.children.length && node.text}
            {!node.root && !node.children.length && node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </p>
        )
      case 'h1':
        return (
          <h1 key={key} className="mb-4 text-2xl font-bold text-foreground">
            {!node.children.length && node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </h1>
        )
      case 'h2':
        return (
          <h2 key={key} className="mb-3 text-xl font-semibold text-foreground">
            {!node.children.length && node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </h2>
        )
      case 'img':
        return (
          <img
            key={key}
            src={node.attributes?.src || ''}
            alt={node.attributes?.alt || 'Изображение'}
            className="my-4 h-auto max-w-full rounded-lg"
          />
        )
      case 'a':
        const href = node.attributes?.href || '#'
        const fullHref = href.startsWith('/') ? `https://lenta.ru${href}` : href
        return (
          <a
            key={key}
            href={fullHref}
            onClick={(e) => {
              e.preventDefault()
              externalLink(fullHref)
            }}
            className="text-blue-600 hover:underline"
          >
            {node.text || href}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </a>
        )
      case 'figure':
        return (
          <figure key={key} className="my-4">
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </figure>
        )
      case 'figcaption':
        return (
          <figcaption key={key} className="mt-1 text-center text-sm italic text-muted-foreground">
            {!node.children.length&& node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </figcaption>
        )
      case 'blockquote':
        return (
          <blockquote
            key={key}
            className="my-4 border-l-4 border-gray-300 pl-4 italic text-card-foreground py-2"
          >
            {!node.children.length && node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </blockquote>
        )
      case 'br':
        return null
      default:
        return node.text ? (
          <span key={key} className="text-base text-card-foreground">
            {node.text}
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </span>
        ) : null
    }
  }

  return (
    <div className="w-10/12 items-center self-center pb-3">
      {news.media && <ProgressiveImage mediaData={news.media} />}
      {news.content && (
        <div className="prose prose-sm max-w-none">
          {news.content.map((node, index) => renderNode(node, index))}
        </div>
      )}
      <p className="mr-5 mt-2 text-right text-base font-bold italic text-foreground">
        <span>Источник: </span>
        <span
          className="cursor-pointer not-italic underline hover:no-underline"
          onClick={() => externalLink('https://lenta.ru/')}
        >
          Lenta.ru
        </span>
      </p>
    </div>
  )
}
