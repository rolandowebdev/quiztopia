import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questionCategory: '',
  questionDifficulty: '',
  amountOfQuestion: 0,
  correctAnswer: 0,
  incorrectAnswers: 0,
  notAnswer: 0,
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
    setAmountOfQuestion: (state, action) => {
      state.amountOfQuestion = action.payload
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload
    },
    setIncorrectAnswers: (state, action) => {
      state.incorrectAnswers = action.payload
    },
    setNotAnswer: (state, action) => {
      state.notAnswer = action.payload
    },
  },
})

export const {
  setAmountOfQuestion,
  setQuestionCategory,
  setQuestionDifficulty,
  setCorrectAnswer,
  setIncorrectAnswers,
} = questionSlice.actions

export default questionSlice.reducer
