import { useEffect, useState } from 'react'

export const useOnline = (intervalMs: number = 10000): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(false)

  const checkOnlineStatus = async () => {
    console.log('try')
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
    checkOnlineStatus()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      checkOnlineStatus()
    }, intervalMs)

    checkOnlineStatus()

    return () => clearInterval(interval)
  }, [intervalMs])

  return isOnline
}
