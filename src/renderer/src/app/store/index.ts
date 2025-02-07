import { configureStore } from '@reduxjs/toolkit'

import { ApplicationReducer } from '@entities/application'

// import { CityWeatherReducer } from '@entities/city'

export const store = configureStore({
  reducer: {
    // 'city-weather': CityWeatherReducer,
    application: ApplicationReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
