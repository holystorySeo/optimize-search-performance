import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputValue: '',
  selectedIdx: -2,
  suggestionList: [],
  showResult: false,
};

const searchSlice = createSlice({
  name: 'searching',
  initialState,
  reducers: {
    updateInputValue(state, action) {
      state.inputValue = action.payload;
    },

    updateIdx(state, action) {
      state.selectedIdx = state.selectedIdx + action.payload;
    },

    insertIdx(state, action) {
      state.selectedIdx = action.payload;
    },

    updateSuggestionList(state, action) {
      state.suggestionList = [...action.payload];
    },

    updateShowResult(state, action) {
      state.showResult = action.payload;
    }
  }
})

export const {
  updateInputValue,
  updateIdx,
  insertIdx,
  updateSuggestionList,
  updateShowResult,
} = searchSlice.actions;
export default searchSlice.reducer;

