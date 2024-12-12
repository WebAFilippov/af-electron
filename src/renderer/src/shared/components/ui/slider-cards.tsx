import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { FC } from 'react'

import { CityForWeather } from '@entities/city-for-weather'

import { cn } from '@shared/lib'

type PropType = {
  slides: CityForWeather[]
  toggleSelected: (id: number) => void
  options?: EmblaOptionsType
}

export const SliderCards: FC<PropType> = (props) => {
  const { slides, toggleSelected, options } = props
  const [emblaRef, _emblaApi] = useEmblaCarousel(options)

  return (
    <div className="rounded-md bg-opacity_card_bg p-2 user-select-none">
      <div className="relative h-[calc(var(--slide-height))] w-full">
        <section className="absolute inset-0 mx-auto w-full">
          <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="pinch-zoom -ml-[calc(var(--slide-spacing)*1)] flex touch-pan-y gap-3">
              {slides.length > 0 &&
                slides.map((slide) => (
                  <div className="w-[250px] flex-none" key={slide.id}>
                    <div
                      className={cn(
                        'flex h-[var(--slide-height)] cursor-pointer items-center justify-center rounded-md bg-foreground text-4xl font-semibold shadow-inner ring-1 ring-border',
                        slide.isSelected && 'bg-orange-400'
                      )}
                      onClick={() => toggleSelected(slide.id)}
                    >
                      {slide.cityInfo.city}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
