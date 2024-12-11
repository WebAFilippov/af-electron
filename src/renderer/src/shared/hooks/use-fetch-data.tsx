import { useState } from 'react'

import { ApiError } from '@shared/types'

export const useFetchData = <T, P>(fetchFunction: (params: P) => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<ApiError | undefined>(undefined)

  const fetchData = async (params: P) => {
    setIsError(undefined)
    setIsLoading(true)
    try {
      const response = await fetchFunction(params)
      setData(response)
    } catch (error: unknown) {
      if (isApiError(error)) {
        setIsError({
          statusCode: error.statusCode,
          message: error.message
        })
      } else if (error instanceof Error) {
        setIsError({
          statusCode: 999,
          message: error.message
        })
      } else {
        setIsError({
          statusCode: 1000,
          message: 'Неизвестная ошибка'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, isError, fetchData } as const
}

// @shared/lib/ApiError.ts
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error &&
    typeof (error as ApiError).statusCode === 'number' &&
    typeof (error as ApiError).message === 'string'
  )
}
