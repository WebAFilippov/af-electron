import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'

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
    getAllCityForWeather: builder.query({
      async queryFn() {
        try {
          const data = await window.api.getApplicationSettings()
          return { data }
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    })
  })
})

export const { useLazyGetAllCityForWeatherQuery } = ApplicationElectronAPI
