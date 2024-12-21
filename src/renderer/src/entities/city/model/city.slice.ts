import { createSlice,  PayloadAction } from '@reduxjs/toolkit'

import { CityForWeather, InitialState, Weather } from './types'

const initialState: InitialState = {
  cityForWeather: [],
  selected: null
}

const CityForWeatherSlice = createSlice({
  name: 'city-for-weather',
  initialState,
  reducers: (create) => ({
    setCityForWeatherStore: create.reducer((_state, action: PayloadAction<InitialState>) => {
      return action.payload
    }),

    addCityForWeather: create.reducer((state, action: PayloadAction<CityForWeather>) => {
      state.cityForWeather?.push(action.payload)
    }),

    removeCityForWeather: create.reducer((state, action: PayloadAction<{ id: number }>) => {
      const newStateCity = state.cityForWeather?.filter((city) => city.id !== action.payload.id)
      state.cityForWeather = newStateCity
    }),

    toggleIsDefault: create.reducer((state, action: PayloadAction<number | null>) => {
      state.cityForWeather?.forEach((city) => (city.isDefault = city.id === action.payload))
    }),

    toggleSelected: create.reducer((state, action: PayloadAction<number | null>) => {
      const selectedCity = state.selected === action.payload
      if (!selectedCity) {
        state.selected = state.selected === action.payload ? null : action.payload
      }
    }),

    setWeatherForCity: create.reducer(
      (state, action: PayloadAction<{ id: number; weather: Weather }>) => {
        const city = state.cityForWeather?.find((city) => city.id === action.payload.id)

        if (city) {
          city.weather = action.payload.weather
        }
      }
    )
  }),
  selectors: {
    getSelected: (state) => state.selected,
    allCityForWeather: (state) => (state.cityForWeather),
    getCityForWeatherByIsDefault: (state) => state.cityForWeather?.find((city) => city.isDefault),
    getCityForWeatherBySelected: (state) =>
      state.cityForWeather?.find((city) => city.id === state.selected)
  }
})

export const {
  getSelected,
  allCityForWeather,
  getCityForWeatherByIsDefault,
  getCityForWeatherBySelected
} = CityForWeatherSlice.selectors

export const {
  setCityForWeatherStore,
  addCityForWeather,
  removeCityForWeather,
  toggleIsDefault,
  toggleSelected
} = CityForWeatherSlice.actions

export const CityForWeatherReducer = CityForWeatherSlice.reducer
