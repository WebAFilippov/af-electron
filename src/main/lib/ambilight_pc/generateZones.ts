import { Display, screen } from 'electron'

export interface Zone {
  leds: number
  side: 'BOTTOM' | 'TOP' | 'LEFT' | 'RIGHT'
  direction: 'CW' | 'CCW'
}

export interface ReturnZone {
  x: number
  y: number
  w: number
  h: number
}

export interface OptionScreen {
  id: number
  withWorkArea: boolean
}

export const generateZones = (
  zones: Zone[],
  option: OptionScreen,
  display: Display
): ReturnZone[] => {
  const zonesArrays = []

  //   // нижняя линия (справа -> влево)
  //   const bottomW = Math.floor(WIDTH / ledsBottom)
  //   const bottomH = Math.floor(HEIGHT * 0.2)
  //   for (let i = ledsBottom - 1; i >= 0; i--)
  //     zones.push({ x: i * bottomW, y: HEIGHT - bottomH, w: bottomW, h: bottomH })

  //   // левая линия (снизу -> вверх)
  //   const leftW = Math.floor(WIDTH * 0.2)
  //   const leftH = Math.floor(HEIGHT / ledsLeft)
  //   for (let i = ledsLeft - 1; i >= 0; i--) zones.push({ x: 0, y: i * leftH, w: leftW, h: leftH })

  //   // верхняя линия (слева -> вправо)
  //   const topW = Math.floor(WIDTH / ledsTop)
  //   const topH = Math.floor(HEIGHT * 0.2)
  //   for (let i = 0; i < ledsTop; i++) zones.push({ x: i * topW, y: 0, w: topW, h: topH })

  //   // правая линия (сверху -> вниз)
  //   const rightW = Math.floor(WIDTH * 0.2)
  //   const rightH = Math.floor(HEIGHT / ledsRight)
  //   for (let i = 0; i < ledsRight; i++)
  //     zones.push({ x: WIDTH - rightW, y: i * rightH, w: rightW, h: rightH })

  return newZones
}

const zones: Zone[] = [
  {
    side: 'BOTTOM',
    leds: 30,
    direction: 'CW'
  },
  {
    side: 'LEFT',
    leds: 15,
    direction: 'CW'
  },
  {
    side: 'TOP',
    leds: 30,
    direction: 'CW'
  },
  {
    side: 'RIGHT',
    leds: 15,
    direction: 'CW'
  }
]

const displays = screen.getAllDisplays()

const id = 2976243371
const display = displays.find((display) => display.id === id)

generateZones(zones, opt)
