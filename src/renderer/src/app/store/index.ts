import { configureStore } from '@reduxjs/toolkit'

import { citiesForWeatherSlice } from '@features/cities/model/cities.slice'

export const store = configureStore({
  reducer: {
    citiesForWeather: citiesForWeatherSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
