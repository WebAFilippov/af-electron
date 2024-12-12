// import { createApi } from '@reduxjs/toolkit/query/react'

// import { SearchCitiesParams } from '../../../../../shared/types'
// import { CityForWeather } from '../model/types'

// const CityForWeatherAPI = createApi({
//   reducerPath: 'CityForWeatherApi',
//   baseQuery: async () => {
//     throw new Error('baseQuery not used')
//   },
//   endpoints: (builder) => ({
//     getAllCityForWeather: builder.query<Omit<CityForWeather, 'weather'>, SearchCitiesParams>({
//       queryFn: async (optionsQuery) => {
//         try {
//           const data: Omit<CityForWeather, 'weather'>[] = await window.api.searchCities()
//           return { data } // Возвращаем успешный результат.
//         } catch (error: any) {
//           // Возвращаем ошибку, если вызов завершился неудачно.
//           return {
//             error: { status: 'CUSTOM_ERROR', data: error.message || 'Ошибка' }
//           }
//         }
//       }
//     })
//   })
// })
