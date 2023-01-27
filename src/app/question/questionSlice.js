import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questionCategory: '',
  questionDifficulty: '',
  amountOfQuestion: 0,
  correctAnswer: 0,
  incorrectAnswer: 0,
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
    setIncorrectAnswer: (state, action) => {
      state.incorrectAnswer = action.payload
    },
    setNotAnswer: (state, action) => {
      state.notAnswer = action.payload
    },
  },
})

export const { setAmountOfQuestion, setQuestionCategory, setQuestionDifficulty, setCorrectAnswer, setIncorrectAnswer } =
  questionSlice.actions

export default questionSlice.reducer
