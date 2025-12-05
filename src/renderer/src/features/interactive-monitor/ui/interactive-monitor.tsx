import { $displays } from '@entities/monitors/model'

import {

  Button,
  ButtonGroup,
  ButtonGroupSeparator,

} from '@shared/ui'
import { useUnit } from 'effector-react'
import { Fragment } from 'react'

export const InteractiveMonitor = () => {
  const [displays] = useUnit([$displays])

  return (
    <div className="lg:col-span-7 w-full flex flex-col space-y-4 justify-center items-center">
      <ButtonGroup>
        {displays.map((display, index) => {
          return (
            <Fragment key={display.label}>
              <Button size="lg" variant="default">
                {display.label}
              </Button>
              {index < displays.length - 1 && <ButtonGroupSeparator />}
            </Fragment>
          )
        })}
      </ButtonGroup>

      <div className="w-full h-full max-h-[calc(100%-4rem)] p-4 flex items-center justify-center">
        <div
          className="w-full max-w-4xl "
          style={
            {
              // aspectRatio: `${activeDisplay?.size.width} / ${activeDisplay?.size.height}`
            }
          }
        >
          <div
            tabIndex={0}
            className="w-full h-full bg-slate-200/50 dark:bg-zinc-700/50 border border-slate-300 dark:border-zinc-600/50 rounded-lg p-3 flex items-center justify-center outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="relative w-full h-full border-2 border-dashed border-slate-400 dark:border-zinc-600 rounded-md">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="font-bold text-slate-800 dark:text-zinc-100">
                  {/* {activeDisplay?.label} */}
                </p>
                <p className="text-xs text-slate-600 dark:text-zinc-300">
                  {/* {activeDisplay?.bounds.width * activeDisplay?.scaleFactor}x */}
                  {/* {activeDisplay && */}
                  {/* activeDisplay.bounds.height * activeDisplay.scaleFactor} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
