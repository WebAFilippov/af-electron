import { configureStore } from '@reduxjs/toolkit'

import { CityForWeatherReducer } from '@entities/city-for-weather'

export const store = configureStore({
  reducer: {
    'city-for-weather': CityForWeatherReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
