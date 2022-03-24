import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIdx: -2,
};

const searchSlice = createSlice({
  name: 'searching',
  initialState,
  reducers: {
    updateIdx(state, action) {
      state.selectedIdx = state.selectedIdx + action.payload;
    },

    insertIdx(state, action) {
      state.selectedIdx = action.payload;
    },
  }
})

export const {
  updateIdx,
  insertIdx,
} = searchSlice.actions;
export default searchSlice.reducer;

