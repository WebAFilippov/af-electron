import { configureStore } from '@reduxjs/toolkit'

import { CityForWeatherReducer } from '@entities/city-for-weather'
import { CityForWeatherAPI } from '@entities/city-for-weather/api/city-for-weather-electron.api'

export const store = configureStore({
  reducer: {
    [CityForWeatherAPI.reducerPath]: CityForWeatherAPI.reducer,
    'city-for-weather': CityForWeatherReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([CityForWeatherAPI.middleware])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
