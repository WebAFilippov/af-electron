import { configureStore } from '@reduxjs/toolkit'

import { ApplicationReducer } from '@entities/application'
import { ApplicationElectronAPI } from '@entities/application/api/application-electron.api'
import { CityForWeatherElectronAPI, CityForWeatherReducer } from '@entities/city-for-weather'

export const store = configureStore({
  reducer: {
    [ApplicationElectronAPI.reducerPath]: ApplicationElectronAPI.reducer,
    [CityForWeatherElectronAPI.reducerPath]: CityForWeatherElectronAPI.reducer,
    'city-for-weather': CityForWeatherReducer,
    application: ApplicationReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      CityForWeatherElectronAPI.middleware,
      ApplicationElectronAPI.middleware
    ])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
