import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { $cursor } from '@features/application'

import { cn } from '@shared/lib'

export const Cursor = () => {
  const [hidden, setHidden] = useState(false)
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState(false)

  const cursor = useUnit($cursor)
  const cursorRef = useRef(null)

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX - cursor.offsetX
    const y = e.clientY - cursor.offsetY

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  const handleMouseEnter = () => setHidden(false)
  const handleMouseLeave = () => setHidden(true)

  useEffect(() => {
    setSupportsBackdropFilter('backdropFilter' in document.documentElement.style)
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
      ref={cursorRef}
      className={cn('cursor-circle', hidden && 'hidden-circle')}
      style={{
        width: cursor.sizes,
        height: cursor.sizes,
        backdropFilter: supportsBackdropFilter ? 'grayscale(1)' : 'none',
      }}
    />
  )
}
