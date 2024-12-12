import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CityForWeather, Weather } from './types'

const initialState: CityForWeather[] = []

const CityForWeatherSlice = createSlice({
  name: 'city-for-weather',
  initialState,
  reducers: (create) => ({
    setCities: create.reducer((_state, action: PayloadAction<CityForWeather[]>) => {
      return action.payload
    }),

    addCity: create.reducer((state, action: PayloadAction<CityForWeather>) => {
      state.push(action.payload)
    }),

    removeCity: create.reducer((state, action: PayloadAction<{ id: number }>) => {
      return state.filter((city) => city.id !== action.payload.id)
    }),

    toggleIsSelected: create.reducer((state, action: PayloadAction<number | null>) => {
      state.forEach((city) => (city.isSelected = city.id === action.payload))
    }),

    setWeatherForCity: create.reducer(
      (state, action: PayloadAction<{ id: number; weather: Weather }>) => {
        const city = state.find((city) => city.id === action.payload.id)

        if (city) {
          city.weather = action.payload.weather
        }
      }
    )
  }),
  selectors: {
    allCities: (state) => state,
    getCityById: (state, id: number) => state.find((city) => city.id === id),
    getCityByIsSelected: (state) => state.find((city) => city.isSelected)
  }
})

export const { allCities, getCityById, getCityByIsSelected } = CityForWeatherSlice.selectors

export const { setCities, addCity, removeCity, toggleIsSelected } = CityForWeatherSlice.actions

export const CityForWeatherReducer = CityForWeatherSlice.reducer
