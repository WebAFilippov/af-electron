import { configureStore } from '@reduxjs/toolkit'

import { ApplicationReducer } from '@entities/application'
import { CityForWeatherAPI, CityForWeatherReducer } from '@entities/city-for-weather'

export const store = configureStore({
  reducer: {
    [CityForWeatherAPI.reducerPath]: CityForWeatherAPI.reducer,
    'city-for-weather': CityForWeatherReducer,
    application: ApplicationReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([CityForWeatherAPI.middleware])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
