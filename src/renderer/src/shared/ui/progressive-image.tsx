import { FC, useState } from 'react'

import { MediaData } from '@entities/news'

// Утилита для извлечения текста из ParsedNodeSchema[]
const extractText = (
  nodes: MediaData['credit'] | MediaData['title'] | MediaData['text']
): string => {
  if (!nodes || nodes.length === 0) return ''
  return (
    nodes
      .map((node) => node.text)
      .filter(Boolean)
      .join('. ') || ''
  )
}

interface Props {
  mediaData: MediaData
}

export const ProgressiveImage: FC<Props> = ({ mediaData }) => {
  const [loaded, setLoaded] = useState(false)
  const [errorLoaded, setErrorLoaded] = useState(false)
  const { contentUrl, thumbnailUrl, credit, title, text } = mediaData

  if (!contentUrl || errorLoaded) {
    return null
  }

  const creditText = extractText(credit)
  const titleText = extractText(title)
  const captionText = extractText(text)

  return (
    <div className="float-end ml-6 mt-2 h-fit w-fit">
      <div className="relative h-72 w-96 overflow-hidden rounded-xl">
        {!loaded && thumbnailUrl && (
          <img
            className="pointer-events-none absolute h-full w-full select-none bg-muted object-fill blur-sm filter"
            src={thumbnailUrl}
            alt={creditText || 'Фото'}
          />
        )}
        <img
          className="pointer-events-none absolute h-full w-full select-none object-fill"
          src={contentUrl}
          alt={creditText || 'Фото'}
          onLoad={() => setLoaded(true)}
          onError={() => setErrorLoaded(true)}
        />
      </div>
      <div className="mt-1 w-96">
        {(titleText || creditText) && (
          <p className="text-right text-[0.7rem] italic text-muted-foreground">
            {[titleText, creditText].filter(Boolean).join('. ')}
          </p>
        )}
        {captionText && (
          <p className="text-center text-xs font-semibold text-muted-foreground">{captionText}</p>
        )}
      </div>
    </div>
  )
}
