import { decode } from 'html-entities'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { SectionContainer } from '../../layouts'
import { generateApiUrl } from '../../libs/generateApiUrl'
import { generateRandom } from '../../libs/generateRandom'
import { Alert, Button, Loader, Timer } from '../../components'

import { setCorrectAnswer, setIncorrectAnswer } from '../../app/question/questionSlice'
import { useAxios } from '../../hooks'

const Question = () => {
  const { questionCategory, questionDifficulty, amountOfQuestion, correctAnswer, incorrectAnswer } = useSelector(
    (state) => state.question
  )

  const dispatch = useDispatch()
  const [options, setOptions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [hasNavigatedResult, setHasNavigatedResult] = useState(false)
  const [notAnswerd, setNotAnswerd] = useState(parseInt(amountOfQuestion, 10) || 0)

  // generated api
  const apiUrl = generateApiUrl(amountOfQuestion, questionCategory, questionDifficulty)
  const { response, loading, error } = useAxios({ url: apiUrl })
  const results = response ? response.results : []

  // TODO: store questions data into localstorage
  useEffect(() => {
    if (results?.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
      localStorage.setItem('questions', JSON.stringify(results))
      localStorage.setItem('incorrectAnswer', JSON.stringify(incorrectAnswer))
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
      localStorage.setItem('notAnswerd', JSON.stringify(notAnswerd))
    }
  }, [results, questionIndex, incorrectAnswer, correctAnswer, notAnswerd])

  // TODO: make random correct answer each user chooses an answer
  const handleOptions = () => {
    const question = results[questionIndex]
    if (question && question.incorrect_answers) {
      const answers = [...question.incorrect_answers]
      answers.splice(generateRandom(question.incorrect_answers.length), 0, question.correct_answer)
      setOptions(answers)
    }
  }

  useEffect(() => {
    if (!loading && results?.length) handleOptions()
  }, [loading, results, questionIndex])

  // TODO: handle when user choose answer
  const handleAnswer = (e) => {
    const question = results[questionIndex]
    const decodeCorrectAnswer = decode(question.correct_answer)
    const decodeIncorrectAnswer = question.incorrect_answers.map((incorrectAnswer) => decode(incorrectAnswer))

    const isCorrect = decodeCorrectAnswer.includes(e.target.textContent)
    const isIncorrect = decodeIncorrectAnswer.includes(e.target.textContent)
    const isNotAnswerd = results.length - (incorrectAnswer + correctAnswer) - 1

    if (isCorrect) dispatch(setCorrectAnswer(correctAnswer + 1))
    if (isIncorrect) dispatch(setIncorrectAnswer(incorrectAnswer + 1))
    if (!isCorrect || !isIncorrect) setNotAnswerd(isNotAnswerd)
    if (isCorrect || isIncorrect) setQuestionIndex((prevIndex) => prevIndex + 1)
    if (questionIndex + 1 >= results?.length) setHasNavigatedResult(true)
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
        {options.map((option) => (
          <Button key={option} type="button" onClick={handleAnswer} value={decode(option)}>
            {decode(option)}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-xl">
          Correct: <span className="font-bold text-green-500">{correctAnswer}</span> /
          <span className="ml-1 text-gray-500">{results?.length}</span>
        </p>
        <p className="text-xl">
          Incorrect: <span className="font-bold text-red-500">{incorrectAnswer}</span> /
          <span className="ml-1 text-gray-500">{results?.length}</span>
        </p>
      </div>
      <Timer time={results.length * 30} />
    </SectionContainer>
  )
}

export default Question
