import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

  keyword : "",
  items: [],
  selectedItems: {},

}

export const getItems = createAsyncThunk('getItems', async (_, { getState })=> {
    const keyword = getState().searchingItems.keyword;
    const {data} = await axios.get(`https://www.trade-tariff.service.gov.uk/api/v2/search_references.json?query[letter]=${keyword}`)
    return data
})


export const fetchItems = createSlice({
  name: 'fetchItems',
  initialState,
  reducers: {
    handleKeyword : (state , action) => {
        state.keyword = action.payload
    },
    setSelectedItem : (state , action) =>
        state.selectedItems = action.payload
  },
  extraReducers : (builder) => {
    builder.addCase(getItems.fulfilled , (state , action) => {

        const exactItemDatas = action.payload.data.map(item => ({
            value: item.attributes.goods_nomenclature_item_id,
            label: item.attributes.title,
          }));

        state.items = exactItemDatas

    })
  }
})

export const { handleKeyword , setSelectedItem } = fetchItems.actions

export default fetchItems.reducer