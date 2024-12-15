import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'

import { CityForWeather } from '../model/types'

const electronBaseQuery: BaseQueryFn<void, unknown, unknown> = async () => {
  try {
    return { data: null }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const CityForWeatherElectronAPI = createApi({
  reducerPath: 'CityForWeatherElectronApi',
  baseQuery: electronBaseQuery,
  endpoints: (builder) => ({
    getAllCityForWeather: builder.query<CityForWeather[], void>({
      async queryFn() {
        try {
          const data = await window.api.getAllCityForWeather()
          return { data }
        } catch (error: unknown) {
          return {
            error: error instanceof Error ? error : new Error(String(error))
          }
        }
      }
    }),
    createCityForWeather: builder.query<CityForWeather, number>({
      async queryFn(cityId: number) {
        if (!cityId) {
          throw new Error('City ID is required')
        }

        try {
          const data = await window.api.createCityForWeatherByCityId(cityId)
          return { data }
        } catch (error: unknown) {
          throw new Error('City ID is required')
        }
      }
    })
  })
})

export const { useLazyGetAllCityForWeatherQuery, useLazyCreateCityForWeatherQuery } =
  CityForWeatherElectronAPI
