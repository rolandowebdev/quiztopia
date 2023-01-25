import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questionCategory: '',
  questionDifficulty: '',
  questionType: '',
  amountOfQuestion: 0,
  correctAnswer: 0,
  incorrectAnswer: 0,
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionCategory: (state, action) => {
      state.questionCategory = action.payload
    },
    setQuestionDifficulty: (state, action) => {
      state.questionDifficulty = action.payload
    },
    setQuestionType: (state, action) => {
      state.questionType = action.payload
    },
    setAmountOfQuestion: (state, action) => {
      state.amountOfQuestion = action.payload
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload
    },
    setIncorrectAnswer: (state, action) => {
      state.incorrectAnswer = action.payload
    },
  },
})

export const {
  setAmountOfQuestion,
  setQuestionCategory,
  setQuestionDifficulty,
  setQuestionType,
  setCorrectAnswer,
  setIncorrectAnswer,
} = questionSlice.actions

export default questionSlice.reducer
