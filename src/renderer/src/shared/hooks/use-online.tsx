// import { useEffect, useState } from 'react'
// export const useOnline = (intervalMs: number = 10000): { isOnline: boolean; loading: boolean } => {
//   const [isOnline, setIsOnline] = useState<boolean>(false)
//   const [loading, setLoading] = useState(true)
//   const checkOnlineStatus = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('https://www.yandex.ru/favicon.ico', { cache: 'no-store' })
//       if (response.ok) {
//         setIsOnline(true)
//         setLoading(false)
//         return
//       }
//     } catch {
//       setIsOnline(false)
//       setLoading(false)
//     }
//   }
//   useEffect(() => {
//     checkOnlineStatus()
//   }, [])
//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkOnlineStatus()
//     }, intervalMs)
//     checkOnlineStatus()
//     return () => clearInterval(interval)
//   }, [intervalMs])
//   return { isOnline, loading }
// }
import { useQuery } from '@tanstack/react-query'

export const useOnline = (intervalMs: number = 10000) => {
  const fetchOnlineStatus = async (): Promise<boolean> => {
    const response = await fetch('https://www.yandex.ru/favicon.ico', { cache: 'no-store' })
    return response.ok
  }

  const { data: online = false, isLoading } = useQuery<boolean, Error>({
    queryKey: ['online-status'],
    queryFn: fetchOnlineStatus,
    refetchInterval: intervalMs,
    retry: 0
  })

  return { online, loading: isLoading }
}
