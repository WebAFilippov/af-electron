import { useUnit } from 'effector-react'
import { useEffect, useRef, useState } from 'react'

import { $cursor } from '@features/application'

import { cn } from '@shared/lib'

export const Cursor = () => {
  const [hidden, setHidden] = useState(false)

  const cursor = useUnit($cursor)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX - cursor.offsetX
    const y = e.clientY - cursor.offsetY

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  const handleMouseEnter = () => setHidden(false)
  const handleMouseLeave = () => setHidden(true)

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
        willChange: 'transform'
      }}
    />
  )
}
