// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// import { CityForWeather, Weather } from '../model/types'

// export const CityForWeatherAPI = createApi({
//   reducerPath: 'CityForWeatherApi',
//   baseQuery: fetchBaseQuery(),
//   endpoints: (builder) => ({
//     getWeatherForCities: builder.query<void, void>({
//       async queryFn(_arg, { getState, dispatch }) {
//         try {
//           const state = getState() as { cityForWeather: { cityForWeather: CityForWeather[] } }
//           const cities = state.cityForWeather.cityForWeather

//           await Promise.all(
//             cities.map(async (city) => {
//               try {
//                 const weather: Weather = await window.api.getWeatherByCityId(city.cityId)
//                 dispatch(setWeatherForCity({ id: city.id, weather }))
//               } catch (error) {
//                 console.error(`Ошибка получения погоды для города ${city.cityId}:`, error)
//               }
//             })
//           )

//           return { data: undefined }
//         } catch (error: unknown) {
//           return { error: { status: 'CUSTOM_ERROR', error: String(error) } }
//         }
//       }
//     })
//   })
// })

// export const { useGetWeatherForCitiesQuery } = CityForWeatherAPI
