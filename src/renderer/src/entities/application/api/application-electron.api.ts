import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { useMutation } from '@tanstack/react-query'

const electronBaseQuery: BaseQueryFn<void, unknown, unknown> = async () => {
  try {
    return { data: null }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const ApplicationElectronAPI = createApi({
  reducerPath: 'ApplicationElectronApi',
  baseQuery: electronBaseQuery,
  endpoints: (builder) => ({
    startApp: builder.query({
      async queryFn() {
        try {
          const data = await window.api.startApp()
          return { data }
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    }),
    getAllCityForWeather: builder.query({
      async queryFn() {
        try {
          const data = await window.api.fetchApplicationSettings()
          return { data }
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    }),
    setMinimazeWindow: builder.query({
      async query() {
        try {
          window.api.setMinimazeWindow()
          return undefined
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    }),
    setMaximazeWindow: builder.query({
      async query() {
        try {
          window.api.setMaximazeWindow()
          return undefined
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    }),
    setCloseWindow: builder.query({
      async query() {
        try {
          window.api.setCloseWindow()
          return undefined
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    })
  })
})

export const {
  useLazyGetAllCityForWeatherQuery,
  useStartAppQuery,
  useLazySetMinimazeWindowQuery,
  useLazySetMaximazeWindowQuery,
  useLazySetCloseWindowQuery
} = ApplicationElectronAPI

const useMinimizeWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setMinimazeWindow()
      return Promise.resolve()
    }
  })
}

const useMaximizeWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setMaximazeWindow()
      return Promise.resolve()
    }
  })
}

const useCloseWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setCloseWindow()
      return Promise.resolve()
    }
  })
}

export { useMinimizeWindow, useMaximizeWindow, useCloseWindow }
