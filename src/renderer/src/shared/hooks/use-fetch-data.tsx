import { useState } from 'react'

export const useFetchData = <T, P>(fetchFunction: (params?: P) => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchData = async (params?: P) => {
    setIsError(false)
    setIsLoading(true)
    try {
      const response = await fetchFunction(params)
      setData(response)
    } catch (error: unknown) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, isError, fetchData } as const
}
