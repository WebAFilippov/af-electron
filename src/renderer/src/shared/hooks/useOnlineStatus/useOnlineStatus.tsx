import { useEffect, useState } from 'react'

export const useOnlineStatus = (intervalMs: number = 10000): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(false)

  const checkOnlineStatus = async () => {
    try {
      const response = await fetch('https://www.yandex.ru/favicon.ico', { cache: 'no-store' })
      if (response.ok) {
        setIsOnline(true)
        return
      }
    } catch {
      setIsOnline(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkOnlineStatus()
    }, intervalMs)

    checkOnlineStatus()

    return () => clearInterval(interval)
  }, [intervalMs])

  return isOnline
}
