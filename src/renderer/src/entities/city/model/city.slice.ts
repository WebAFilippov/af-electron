import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CityWeather, InitialState, Weather } from './types'

const initialState: InitialState = {
  cityWeather: [],
  selected: undefined
}

const CityWeatherSlice = createSlice({
  name: 'city-weather',
  initialState,
  reducers: (create) => ({
    setInitialCityWeather: create.reducer((state, action: PayloadAction<CityWeather[]>) => {
      const selected = action.payload.find((city) => city.isDefault)?.id

      state.cityWeather = action.payload
      state.selected = selected
    }),

    addCityWeather: create.reducer((state, action: PayloadAction<CityWeather>) => {
      state.cityWeather.push(action.payload)
    }),

    deleteCityWeather: create.reducer((state, action: PayloadAction<{ id: number }>) => {
      const newStateCityWeather = state.cityWeather.filter((city) => city.id !== action.payload.id)
      if (newStateCityWeather) state.cityWeather = newStateCityWeather
    }),

    toggleIsDefault: create.reducer((state, action: PayloadAction<number | undefined>) => {
      state.cityWeather.forEach((city) => (city.isDefault = city.id === action.payload))
    }),

    toggleSelected: create.reducer((state, action: PayloadAction<number | undefined>) => {
      const selectedCity = state.selected === action.payload

      if (!selectedCity) {
        state.selected = state.selected === action.payload ? undefined : action.payload
      }
    }),

    setWeatherForCity: create.reducer(
      (state, action: PayloadAction<{ id: number; weather: Weather }>) => {
        const city = state.cityWeather.find((city) => city.id === action.payload.id)

        if (city) {
          city.weather = action.payload.weather
        }
      }
    )
  }),
  selectors: {
    getSelected: (state) => state.selected,
    getCityWeatherByIsDefault: (state) => state.cityWeather.find((city) => city.isDefault),
    getAllCityWeather: (state) => state.cityWeather,
    getCityWeatherBySelected: (state) =>
      state.cityWeather.find((city) => city.id === state.selected)
  }
})

export const {
  getSelected,
  getAllCityWeather,
  getCityWeatherByIsDefault,
  getCityWeatherBySelected
} = CityWeatherSlice.selectors

export const {
  setInitialCityWeather,
  addCityWeather,
  deleteCityWeather,
  toggleIsDefault,
  toggleSelected,
  setWeatherForCity
} = CityWeatherSlice.actions

export const CityWeatherReducer = CityWeatherSlice.reducer
