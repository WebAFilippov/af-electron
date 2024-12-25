import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialState } from './types'

const initialState: InitialState = {
  openweathermap_apikey: '',
}

const ApplicationSLice = createSlice({
  name: 'application',
  initialState,
  reducers: (create) => ({
    setInitialApplication: create.reducer((_state, action: PayloadAction<InitialState>) => {
      return action.payload
    }),
    setOpenWeatherMapApiKey: create.reducer((state, action: PayloadAction<string>) => {
      state.openweathermap_apikey = action.payload
    })
  }),
  selectors: {
    getOpenWeatherMapApiKey: (state) => state.openweathermap_apikey
  }
})

export const { getOpenWeatherMapApiKey } = ApplicationSLice.selectors

export const { setInitialApplication, setOpenWeatherMapApiKey } = ApplicationSLice.actions

export const ApplicationReducer = ApplicationSLice.reducer
