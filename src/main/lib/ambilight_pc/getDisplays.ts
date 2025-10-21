import { Logger } from '@utils/logger'
import { Display, screen } from 'electron'

const log = new Logger('getDisplays')

export type Displays = {
  id: number
  label: string
  primary: boolean
  internal: boolean
  scale: number
  rotation: number
  fps: number
  size: {
    offsetX: number
    offsetY: number
    width: number
    height: number
  }
  sizeWorkArea: {
    offsetX: number
    offsetY: number
    width: number
    height: number
  }
}[]

export const getPhysicalDisplays = (): null | Displays => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const displays = screen.getAllDisplays()

  if (!displays) {
    log.error('Дисплей не найден')
    return null
  }

  screen.on('display-added', (_, newDisplay) => {
    console.log('display-added')
  })

  screen.on('display-removed', (_, oldDisplay) => {
    console.log('display-removed')
  })

  screen.on('display-metrics-changed', (_, display) => {
    console.log('display-metrics-changed')
  })

  return displays.map((display) => {
    const { offsetX, offsetY, d_width, d_height } = calcSizes(display)
    return {
      id: display.id,
      label: display.label,
      primary: display.id === primaryDisplay.id,
      internal: display.internal,
      scale: display.scaleFactor,
      rotation: display.rotation,
      fps: Math.trunc(display.displayFrequency),
      size: { offsetX: offsetX, offsetY: offsetY, width: d_width, height: d_height },
      sizeWorkArea: { offsetX: offsetX, offsetY: offsetY, width: d_width, height: d_height }
    }
  })
}

// helpers
const calcSizes = (display: Display) => {
  const offsetX = Math.ceil(display.nativeOrigin.x * display.scaleFactor)
  const offsetY = Math.ceil(display.nativeOrigin.y * display.scaleFactor)
  const d_width = Math.ceil(display.size.width * display.scaleFactor)
  const d_height = Math.ceil(display.size.height * display.scaleFactor)

  return {
    offsetX,
    offsetY,
    d_width,
    d_height
  }
}


// ffmpeg -filter_complex ddagrab=offset_x=0:offset_y=0:output_idx=0:draw_mouse=0:framerate=30,hwdownload,format=bgra,scale=256:160 -c:v libx264 -crf 18 output_display2.mp4
// ffmpeg -filter_complex ddagrab=offset_x=0:offset_y=0:output_idx=0:draw_mouse=0:framerate=30,hwdownload,format=bgra,scale=192:108 -f rawvideo -