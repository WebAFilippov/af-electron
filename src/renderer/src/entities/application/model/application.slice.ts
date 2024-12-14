import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialState } from './types'

const initialState: InitialState = {
  openWeatherMapApiKey: ''
}

const ApplicationSLice = createSlice({
  name: 'application',
  initialState,
  reducers: (create) => ({
    setApplicationStore: create.reducer((_state, action: PayloadAction<InitialState>) => {
      return action.payload
    }),
    setOpenWeatherMapApiKey: create.reducer((state, action: PayloadAction<string>) => {
      state.openWeatherMapApiKey = action.payload
    })
  }),
  selectors: {
    getOpenWeatherMapApiKey: (state) => state.openWeatherMapApiKey
  }
})

export const { getOpenWeatherMapApiKey } = ApplicationSLice.selectors

export const { setApplicationStore, setOpenWeatherMapApiKey } = ApplicationSLice.actions

export const ApplicationReducer = ApplicationSLice.reducer
