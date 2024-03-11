import { configureStore } from '@reduxjs/toolkit'
import  FetchCountries  from './fetchCountries'
import itemInfoSlice from './itemInfoSlice'

export const store = configureStore({
  reducer: {
    countries : FetchCountries,
    itemInfos : itemInfoSlice,
  },
})