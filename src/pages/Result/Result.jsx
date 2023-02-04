import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setCorrectAnswer, setIncorrectAnswers } from '../../app/question/questionSlice'
import { Button } from '../../components'
import { SectionContainer } from '../../layouts'
import { Score } from './Score'

export const Result = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const storeQuestionAmount = JSON.parse(localStorage.getItem('questions'))
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'))
  const storeIncorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers'))
  const storeNotAnswer = JSON.parse(localStorage.getItem('notAnswer'))

  const handleBackToDashboard = () => {
    localStorage.clear()
    dispatch(setCorrectAnswer(0))
    dispatch(setIncorrectAnswers(0))
    navigate('/', { replace: true })
  }

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold">Your Final Result🎉</h2>
        <Score
          amountOfQuestion={storeQuestionAmount.length}
          correctAnswer={storeCorrectAnswer}
          incorrectAnswers={storeIncorrectAnswers}
          notAnswer={storeNotAnswer}
        />
      </div>
      <Button type="button" onClick={handleBackToDashboard} value="Back to Dashboard">
        Back to Dashboard
      </Button>
    </SectionContainer>
  )
}
