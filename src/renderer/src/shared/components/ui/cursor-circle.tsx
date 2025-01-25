import { useEffect, useState } from 'react'

import { getCursor } from '@entities/application'

import { useAppSelector } from '@shared/hooks'
import { cn } from '@shared/lib'

type Position = {
  x: number
  y: number
}

export const Cursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [hidden, setHidden] = useState<boolean>(false)
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState<boolean>(false)

  const cursorState = useAppSelector(getCursor)

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX - cursorState.offsetX, y: e.clientY - cursorState.offsetY })
  }

  const handleMouseEnter = () => {
    setHidden(false)
  }

  const handleMouseLeave = () => {
    setHidden(true)
  }

  useEffect(() => {
    const checkBackdropFilterSupport = () => {
      const supports =
        'backdropFilter' in document.documentElement.style ||
        'webkitBackdropFilter' in document.documentElement.style
      setSupportsBackdropFilter(supports)
    }

    checkBackdropFilterSupport()
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      className={cn('cursor-circle', hidden && 'hidden-circle')}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: cursorState.size,
        height: cursorState.size,
        backdropFilter: supportsBackdropFilter ? 'grayscale(1)' : 'none',
        WebkitBackdropFilter: supportsBackdropFilter ? 'grayscale(1)' : 'none'
      }}
    />
  )
}
