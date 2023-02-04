import { decode } from 'html-entities'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { Alert, Button, Loader, Timer } from '../../components'
import { SectionContainer } from '../../layouts'
import { generateApiUrl } from '../../libs/generateApiUrl'
import { generateRandom } from '../../libs/generateRandom'

import { setCorrectAnswer, setIncorrectAnswers } from '../../app/question/questionSlice'
import { useAxios } from '../../hooks'

const TIMER_COUNT = 30

export const Question = () => {
  const { questionCategory, questionDifficulty, amountOfQuestion, correctAnswer, incorrectAnswers } = useSelector(
    (state) => state.question
  )

  const dispatch = useDispatch()
  const [randomAnswers, setRandomAnswers] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [hasNavigatedResult, setHasNavigatedResult] = useState(false)
  const [notAnswer, setNotAnswer] = useState(parseInt(amountOfQuestion, 10) || 0)

  const apiUrl = generateApiUrl(amountOfQuestion, questionCategory, questionDifficulty)
  const { response, loading, error } = useAxios({ url: apiUrl })
  const results = response ? response?.results : []

  useEffect(() => {
    if (results?.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
      localStorage.setItem('questions', JSON.stringify(results))
      localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers))
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
      localStorage.setItem('notAnswer', JSON.stringify(notAnswer))
    }
  }, [results, questionIndex, incorrectAnswers, correctAnswer, notAnswer])

  const handleRandomAnswers = () => {
    const question = results[questionIndex]
    const answers = [...question.incorrect_answers]
    answers.splice(generateRandom(question.incorrect_answers.length), 0, question.correct_answer)
    setRandomAnswers(answers)
  }

  useEffect(() => {
    if (!loading && results?.length) handleRandomAnswers()
  }, [loading, results, questionIndex])

  const decodeAnswers = () => {
    const question = results[questionIndex]
    const decodeCorrectAnswer = decode(question.correct_answer)
    const decodeIncorrectAnswer = question.incorrect_answers.map((incorrectAnswer) => decode(incorrectAnswer))
    return { decodeCorrectAnswer, decodeIncorrectAnswer }
  }

  const checkAnswer = (answer) => {
    const { decodeCorrectAnswer, decodeIncorrectAnswer } = decodeAnswers()
    const isCorrect = decodeCorrectAnswer.includes(answer)
    const isIncorrect = decodeIncorrectAnswer.includes(answer)
    return { isCorrect, isIncorrect }
  }

  const updateAnswerCount = (answer) => {
    const { isCorrect, isIncorrect } = checkAnswer(answer)
    if (isCorrect) dispatch(setCorrectAnswer(correctAnswer + 1))
    if (isIncorrect) dispatch(setIncorrectAnswers(incorrectAnswers + 1))
    if (!isCorrect || !isIncorrect) setNotAnswer(results.length - (incorrectAnswers + correctAnswer) - 1)
  }

  const moveNextQuestion = () => {
    if (questionIndex + 1 >= results?.length) setHasNavigatedResult(true)
    else setQuestionIndex(questionIndex + 1)
  }

  const handleAnswers = (e) => {
    const answer = e.target.textContent
    updateAnswerCount(answer)
    moveNextQuestion(questionIndex, results)
  }

  if (!loading && !results?.length) return <Navigate to="/resume-question" replace={true} />
  if (hasNavigatedResult) return <Navigate to="/result" replace={true} />

  if (loading) return <Loader height={60} width={60} loaderColor="#4B56D2" />
  if (error) return <Alert message={error} type="error" />

  return (
    <SectionContainer>
      <h2 className="text-4xl font-bold text-primary">Question {questionIndex + 1}</h2>
      <p className="my-3 text-lg">{decode(results[questionIndex]?.question)}</p>
      <div className="flex flex-col justify-center w-full gap-4">
        {randomAnswers.map((randomAnswer) => (
          <Button key={randomAnswer} type="button" onClick={handleAnswers} value={decode(randomAnswer)}>
            {decode(randomAnswer)}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-xl">
          Correct: <span className="font-bold text-green-500">{correctAnswer}</span> /
          <span className="ml-1 text-gray-500">{results?.length}</span>
        </p>
        <p className="text-xl">
          Incorrect: <span className="font-bold text-red-500">{incorrectAnswers}</span> /
          <span className="ml-1 text-gray-500">{results?.length}</span>
        </p>
      </div>
      <Timer time={results.length * TIMER_COUNT} />
    </SectionContainer>
  )
}
