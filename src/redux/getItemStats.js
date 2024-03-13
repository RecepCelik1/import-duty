import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

  commodityID : "",
  item : [],

}

export const getItemProperties = createAsyncThunk('getItemProperties', async (_, { getState })=> {

    const id = getState().getItemStats.commodityID;
    const {data} = await axios.get(`https://www.trade-tariff.service.gov.uk/api/v2/commodities/${id}`)
    return data
    
})


export const GetItemStats = createSlice({
  name: 'GetItemStats',
  initialState,
  reducers: {
    setCommodityID : (state , action) => {
        state.commodityID = action.payload
    },
  },
  extraReducers : (builder) => {
    builder.addCase(getItemProperties.fulfilled , (state , action) => {

      state.item = action.payload

    })
  }
})

export const { setCommodityID } = GetItemStats.actions

export default GetItemStats.reducer