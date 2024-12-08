import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { City, InitialState } from './types'

const initialState: InitialState = []

const citiesForWeather = createSlice({
  name: 'citiesForWeather',
  initialState,
  reducers: (create) => ({
    initialCities: create.reducer((_state, action: PayloadAction<InitialState>) => {
      return action.payload
    }),
    addCity: create.reducer(
      (
        state,
        action: PayloadAction<{
          id: number
          cityId: number
          isSelected: boolean
          city: City
        }>
      ) => {
        state.push(action.payload)
      }
    ),
    removeCity: create.reducer((state, action: PayloadAction<number>) => {
      return state.filter((city) => city.id !== action.payload)
    }),
    selectCity: create.reducer((state, action: PayloadAction<number>) => {
      state.map((city) => (city.isSelected = city.id === action.payload ? true : false))
    })
  }),
  selectors: {
    allCities: (state) => state,
    selectCityById: (state, id: number) => state.find((city) => city.id === id)
  }
})

export const { initialCities, addCity, removeCity, selectCity } = citiesForWeather.actions

export const { allCities, selectCityById } = citiesForWeather.selectors

export const citiesForWeatherSlice = citiesForWeather.reducer
