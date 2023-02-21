import { createSlice } from '@reduxjs/toolkit'
import getMasters from '../service/getMasters';

const initialState = {
  ledgers: [],
  groups: [],
  types: [],
};

export const masterSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {
    initMasters: (state, action) => {
        getMasters(action.payload).then(res => {
            state = res;
        });

    },
  },
})

// Action creators are generated for each case reducer function
export const { initMasters } = masterSlice.actions;

export default masterSlice.reducer;