import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { decode } from 'html-entities'
import { generateRandom } from '../../libs/generateRandom'
import { SectionContainer } from '../../layouts'
import { Button, Timer } from '../../components'

const ResumeQuestion = () => {
  const storeQuestions = JSON.parse(localStorage.getItem('questions'))
  const storeQuestionIndex = JSON.parse(localStorage.getItem('questionIndex'))
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'))
  const storeIncorrectAnswer = JSON.parse(localStorage.getItem('incorrectAnswer'))
  const storeNotAnswerd = JSON.parse(localStorage.getItem('notAnswerd'))

  const [options, setOptions] = useState([])
  const [hasNavigatedResult, setHasNavigatedResult] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(parseInt(storeQuestionIndex, 10) || 0)
  const [correctAnswer, setCorrectAnswer] = useState(parseInt(storeCorrectAnswer, 10) || 0)
  const [incorrectAnswer, setIncorrectAnswer] = useState(parseInt(storeIncorrectAnswer, 10) || 0)
  const [notAnswerd, setNotAnswerd] = useState(parseInt(storeNotAnswerd, 10) || 0)

  // TODO: store questionIndex, correctAnswer & incorrectAnswer to localstorage
  useEffect(() => {
    if (storeQuestions?.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
      localStorage.setItem('incorrectAnswer', JSON.stringify(incorrectAnswer))
      localStorage.setItem('notAnswerd', JSON.stringify(notAnswerd))
    }
  }, [questionIndex, correctAnswer, incorrectAnswer, notAnswerd])

  // TODO: make random correct answer each user chooses an answer
  const handleOptions = () => {
    const question = storeQuestions[questionIndex]
    if (question && question.incorrect_answers) {
      const answers = [...question.incorrect_answers]
      answers.splice(generateRandom(question.incorrect_answers.length), 0, question.correct_answer)
      setOptions(answers)
    }
  }

  useEffect(() => {
    if (storeQuestions?.length) handleOptions()
  }, [questionIndex, correctAnswer, incorrectAnswer])

  // TODO: handle when user choose answer
  const handleAnswer = (e) => {
    const question = storeQuestions[questionIndex]
    const isCorrect = question.incorrect_answers.includes(e.target.textContent)
    const isIncorrect = question.correct_answer.includes(e.target.textContent)
    const isNotAnswerd = storeQuestions.length - 1 - (correctAnswer + incorrectAnswer)

    if (isCorrect) setCorrectAnswer((prevCorrectAnswer) => prevCorrectAnswer + 1)
    if (isIncorrect) setIncorrectAnswer((prevIncorrectAnswer) => prevIncorrectAnswer + 1)
    if (questionIndex + 1 >= storeQuestions?.length) setHasNavigatedResult(true)

    setNotAnswerd(isNotAnswerd)
    setQuestionIndex(questionIndex + 1)
  }

  if (hasNavigatedResult) return <Navigate to="/result" replace={true} />

  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold text-primary">Question {questionIndex + 1}</h2>
      <p className="my-3 text-lg">{decode(storeQuestions[questionIndex]?.question)}</p>
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
          <span className="ml-1 text-gray-500">{storeQuestions?.length}</span>
        </p>
        <p className="text-xl">
          Incorrect: <span className="font-bold text-red-500">{incorrectAnswer}</span> /
          <span className="ml-1 text-gray-500">{storeQuestions?.length}</span>
        </p>
      </div>
      <Timer time={storeQuestions.length * 30} />
    </SectionContainer>
  )
}

export default ResumeQuestion
