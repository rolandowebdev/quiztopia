import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionCatagory: '',
  questionDifficulty: '',
  questionType: '',
  amountOfQuestion: 10,
  score: 0
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {}
});

export default questionSlice.reducer;
