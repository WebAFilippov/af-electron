import { useEffect, useState } from 'react'

export const useOnline = (intervalMs: number = 10000): { isOnline: boolean; loading: boolean } => {
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const checkOnlineStatus = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://www.yandex.ru/favicon.ico', { cache: 'no-store' })
      if (response.ok) {
        setIsOnline(true)
        setLoading(false)
        return
      }
    } catch {
      setIsOnline(false)
      setLoading(false)
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

  return { isOnline, loading }
}
