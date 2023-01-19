import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionCategory: '',
  questionDifficulty: '',
  questionType: '',
  amountOfQuestion: 0,
  score: 0
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionCategory: (state, action) => {
      state.questionCategory = action.payload;
    },
    setQuestionDifficulty: (state, action) => {
      state.questionDifficulty = action.payload;
    },
    setQuestionType: (state, action) => {
      state.questionType = action.payload;
    },
    setAmountOfQuestion: (state, action) => {
      state.amountOfQuestion = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    }
  }
});

export const { setAmountOfQuestion, setQuestionCategory, setQuestionDifficulty, setQuestionType, setScore } =
  questionSlice.actions;

export default questionSlice.reducer;
