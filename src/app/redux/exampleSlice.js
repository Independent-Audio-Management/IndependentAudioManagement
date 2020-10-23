import { createSlice } from '@reduxjs/toolkit';

export const exampleSlice = createSlice({
  name: 'examples',
  initialState: {
    example: 'sdfs'
  },
  reducers: {
    editExample: (state, action) => {
      state.example = action.payload
    },
    clearExample: (state) => {
      state.example = ''
    },
  },
});

export const { editExample, clearExample } = exampleSlice.actions;
export const selectExample = state => state.examples.example;

export default exampleSlice.reducer;
