import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Score } from './Score'
import { Button } from '../../components'
import { SectionContainer } from '../../layouts'
import { setCorrectAnswer, setIncorrectAnswer } from '../../app/question/questionSlice'

export const Result = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const storeQuestionAmount = JSON.parse(localStorage.getItem('questions'))
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'))
  const storeIncorrectAnswer = JSON.parse(localStorage.getItem('incorrectAnswer'))
  const storeNotAnswerd = JSON.parse(localStorage.getItem('notAnswerd'))

  const handleBackToDashboard = () => {
    localStorage.clear()
    dispatch(setCorrectAnswer(0))
    dispatch(setIncorrectAnswer(0))
    navigate('/', { replace: true })
  }

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold">Your Final Result🎉</h2>
        <Score
          amountOfQuestion={storeQuestionAmount.length}
          correctAnswer={storeCorrectAnswer}
          incorrectAnswer={storeIncorrectAnswer}
          notAnswerd={storeNotAnswerd}
        />
      </div>
      <Button type="button" onClick={handleBackToDashboard} value="Back to Dashboard">
        Back to Dashboard
      </Button>
    </SectionContainer>
  )
}
