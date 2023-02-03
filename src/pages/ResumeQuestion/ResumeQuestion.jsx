import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { decode } from 'html-entities'

import { generateRandom } from '../../libs/generateRandom'
import { SectionContainer } from '../../layouts'
import { Button, Timer } from '../../components'

export const ResumeQuestion = () => {
  const storeQuestions = JSON.parse(localStorage.getItem('questions'))
  const storeQuestionIndex = JSON.parse(localStorage.getItem('questionIndex'))
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'))
  const storeIncorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers'))
  const storeNotAnswer = JSON.parse(localStorage.getItem('notAnswer'))

  const [randomAnswers, setRandomAnswers] = useState([])
  const [hasNavigatedResult, setHasNavigatedResult] = useState(false)
  const [notAnswer, setNotAnswer] = useState(parseInt(storeNotAnswer, 10) || 0)
  const [questionIndex, setQuestionIndex] = useState(parseInt(storeQuestionIndex, 10) || 0)
  const [correctAnswer, setCorrectAnswer] = useState(parseInt(storeCorrectAnswer, 10) || 0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(parseInt(storeIncorrectAnswers, 10) || 0)

  useEffect(() => {
    if (storeQuestions.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
      localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers))
      localStorage.setItem('notAnswer', JSON.stringify(notAnswer))
    }
  }, [questionIndex, correctAnswer, incorrectAnswers, notAnswer])

  const handleRandomAnswers = () => {
    const question = storeQuestions[questionIndex]
    const answers = [...question.incorrect_answers]
    answers.splice(generateRandom(question.incorrect_answers.length), 0, question.correct_answer)
    setRandomAnswers(answers)
  }

  useEffect(() => {
    if (storeQuestions?.length) handleRandomAnswers()
  }, [questionIndex])

  const decodeAnswers = () => {
    const question = storeQuestions[questionIndex]
    const decodeCorrectAnswer = decode(question.correct_answer)
    const decodeIncorrectAnswer = question.incorrect_answers.map((incorrectAnswer) => decode(incorrectAnswer))
    return { decodeCorrectAnswer, decodeIncorrectAnswer }
  }

  const checkAnswer = (decodeCorrectAnswer, decodeIncorrectAnswer, answer) => {
    const isCorrect = decodeCorrectAnswer.includes(answer)
    const isIncorrect = decodeIncorrectAnswer.includes(answer)
    return { isCorrect, isIncorrect }
  }

  const updateAnswerCount = (isCorrect, isIncorrect) => {
    if (isCorrect) setCorrectAnswer(correctAnswer + 1)
    if (isIncorrect) setIncorrectAnswers(incorrectAnswers + 1)
    if (!isCorrect || !isIncorrect) setNotAnswer(storeQuestions.length - (incorrectAnswers + correctAnswer) - 1)
  }

  const moveNextQuestion = () => {
    if (questionIndex + 1 >= storeQuestions.length) setHasNavigatedResult(true)
    else setQuestionIndex(questionIndex + 1)
  }

  const handleAnswers = (e) => {
    const answer = e.target.textContent
    const { decodeCorrectAnswer, decodeIncorrectAnswer } = decodeAnswers()
    const { isCorrect, isIncorrect } = checkAnswer(decodeCorrectAnswer, decodeIncorrectAnswer, answer)
    updateAnswerCount(isCorrect, isIncorrect)
    moveNextQuestion(questionIndex, storeQuestions)
  }

  if (!storeQuestions) return <Navigate to="/" replace={true} />
  if (hasNavigatedResult) return <Navigate to="/result" replace={true} />

  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold text-primary">Question {questionIndex + 1}</h2>
      <p className="my-3 text-lg">{decode(storeQuestions[questionIndex]?.question)}</p>
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
          <span className="ml-1 text-gray-500">{storeQuestions.length}</span>
        </p>
        <p className="text-xl">
          Incorrect: <span className="font-bold text-red-500">{incorrectAnswers}</span> /
          <span className="ml-1 text-gray-500">{storeQuestions.length}</span>
        </p>
      </div>
      <Timer time={storeQuestions.length * 30} />
    </SectionContainer>
  )
}
