import { configureStore } from '@reduxjs/toolkit'
import  FetchCountries  from './fetchCountries'
import itemInfoSlice from './itemInfoSlice'
import  fetchItems  from './searchItemSlice'
import GetItemStats from './getItemStats'


export const store = configureStore({
  reducer: {
    countries : FetchCountries,
    itemInfos : itemInfoSlice,
    searchingItems : fetchItems,
    getItemStats : GetItemStats,
  },
})