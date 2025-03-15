import { FC, useState } from 'react'

import { MediaData } from '@entities/news'

interface IProps {
  mediaData: MediaData
}

export const ProgressiveImage: FC<IProps> = ({ mediaData }) => {
  const [loaded, setLoaded] = useState(false)
  const [errorLoaded, setErrorLoaded] = useState(false)
  const { contentUrl, thumbnailUrl, credit, title, text } = mediaData

  if (!contentUrl || errorLoaded) {
    return null
  }
  return (
    <div className="float-end ml-6 mt-2 h-fit w-fit">
      <div className="relative h-72 w-96 overflow-hidden rounded-xl">
        {!loaded && (
          <img
            className="pointer-events-none absolute h-full w-full select-none bg-muted object-fill blur-sm filter"
            src={thumbnailUrl}
            alt={credit || 'Фото'}
          />
        )}

        <img
          className="pointer-events-none absolute h-full w-full select-none object-fill"
          src={contentUrl}
          alt={credit || 'Фото'}
          onLoad={() => setLoaded(true)}
          onError={() => setErrorLoaded(true)}
        />
      </div>
      <div className='w-96 mt-1'>
      <p className="text-right text-[0.7rem] text-muted-foreground italic">
        {[title, credit].filter(Boolean).join('. ')}
      </p>
      <p className="text-center text-xs font-semibold text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
