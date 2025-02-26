import { useEffect, useRef, useState } from 'react'

export const formatRelativeDate = (pubDate: string): string => {
  const now = new Date()
  const date = new Date(pubDate)
  if (isNaN(date.getTime())) return 'Дата неизвестна'

  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) {
    if (diffHours < 1) {
      return `${diffMinutes} мин. назад`
    }
    return `${diffHours} ч. назад`
  }

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const observerMap = new Map<Element, (isVisible: boolean) => void>()
let observer: IntersectionObserver | null = null

const getObserver = (): IntersectionObserver => {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observerMap.get(entry.target)
          if (callback) callback(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )
  }
  return observer
}

export const useIntersectionObserver = (pubDate: string) => {
  const [formattedDate, setFormattedDate] = useState<string>(formatRelativeDate(pubDate))
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = getObserver()

    const callback = (visible: boolean) => {
      setIsVisible(visible)
      if (visible) setFormattedDate(formatRelativeDate(pubDate))
    }

    observerMap.set(element, callback)
    observer.observe(element)

    let intervalId: NodeJS.Timeout | null = null
    if (isVisible) {
      intervalId = setInterval(() => {
        setFormattedDate(formatRelativeDate(pubDate))
      }, 15000)
    }

    return () => {
      if (element) {
        observerMap.delete(element)
        observer.unobserve(element)
      }
      if (intervalId) clearInterval(intervalId)
    }
  }, [pubDate, isVisible])

  return { ref, formattedDate }
}
