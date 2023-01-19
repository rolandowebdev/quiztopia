import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './question/questionSlice';

export const store = configureStore({
  reducer: {
    question: questionReducer
  }
});
