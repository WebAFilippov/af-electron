import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { FC } from 'react'

import { CityWeather } from '@entities/city'

import { cn } from '@shared/lib'

type PropType = {
  slides: CityWeather[]
  selected: number | undefined
  toggleSelected: (id: number) => void
  toggleIsDefault: (id: number) => void
  options?: EmblaOptionsType
}

export const SliderCards: FC<PropType> = (props) => {
  const { slides, selected, toggleSelected, toggleIsDefault, options } = props
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
                        slide.isDefault && 'bg-rose-300',
                        selected === slide.id && 'text-amber-600'
                      )}
                      onClick={() => toggleSelected(slide.id)}
                    >
                      <div className="flex h-full w-full justify-between p-2">
                        <div className="text-2xl">{slide.cityInfo.city}</div>
                        <div className="flex flex-col items-end justify-between py-4 pr-2">
                          <div
                            className="rounded-md bg-slate-600 px-4 py-2 text-lg hover:bg-slate-300"
                            onClick={() => toggleIsDefault(slide.id)}
                          >
                            default
                          </div>
                        </div>
                      </div>
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
