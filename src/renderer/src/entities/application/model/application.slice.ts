import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialState } from './types'

const initialState: InitialState = {
  owm_apikey: '',
  cursor: {
    size: 26,
    offsetX: 19,
    offsetY: 42
  }
}

const ApplicationSLice = createSlice({
  name: 'application',
  initialState,
  reducers: (create) => ({
    setOWMApikey: create.reducer((state, action: PayloadAction<string>) => {
      state.owm_apikey = action.payload
    }),
    setCursor: create.reducer((state, action: PayloadAction<InitialState['cursor']>) => {
      state.cursor = action.payload
    })
  }),
  selectors: {
    getOWMApikey: state => state.owm_apikey,
    getCursor: state => state.cursor
  }
})

export const { getOWMApikey, getCursor } = ApplicationSLice.selectors

export const { setOWMApikey, setCursor } = ApplicationSLice.actions

export const ApplicationReducer = ApplicationSLice.reducer
