import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'

import { Alert, Button, Loader, Timer } from '../../components'
import { SectionContainer } from '../../layouts'
import { generateRandom } from '../../libs/generateRandom'
import { generateApiUrl } from '../../libs/generateApiUrl'

import { setCorrectAnswer, setIncorrectAnswer } from '../../app/question/questionSlice'
import { useAxios } from '../../hooks'

const Question = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [questionIndex, setQuestionIndex] = useState(0)
  const [options, setOptions] = useState([])

  const { questionCategory, questionDifficulty, questionType, amountOfQuestion, correctAnswer, incorrectAnswer } =
    useSelector((state) => state.question)

  // generate api
  const apiUrl = generateApiUrl(amountOfQuestion, questionCategory, questionDifficulty, questionType)
  const { response, loading, error } = useAxios({ url: apiUrl })
  const results = response ? response.results : []

  // TODO: store questionsData, questionIndex, correctAnswer & incorrectAnswer to localstorage
  useEffect(() => {
    if (results?.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex))
      localStorage.setItem('questions', JSON.stringify(results))
      localStorage.setItem('incorrectAnswer', JSON.stringify(incorrectAnswer))
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer))
    }
  }, [results, questionIndex])

  // TODO: make correct answer random position every user choose answer
  useEffect(() => {
    // * check if loading finished & questions empty -> navigate to resume question page
    if (!loading && !results?.length) navigate('/resume-question', { replace: true })
    if (!loading && results?.length) {
      const question = results[questionIndex]
      const answers = [...(question?.incorrect_answers || [])]
      answers.splice(generateRandom(question?.incorrect_answers.length), 0, question?.correct_answer)
      setOptions(answers)
    }
  }, [results, questionIndex])

  // TODO: handle when user choose answer
  const handleAnswer = (e) => {
    const question = results[questionIndex]

    if (question && question.incorrect_answers) {
      if (typeof question.incorrect_answers === 'object') {
        question.incorrect_answers.map(
          (data) => e.target.textContent === data && dispatch(setIncorrectAnswer(incorrectAnswer + 1))
        )
      }
    }

    if (e.target.textContent === question?.incorrect_answers) {
      dispatch(setIncorrectAnswer(incorrectAnswer + 1))
    }

    if (e.target.textContent === question?.correct_answer) {
      dispatch(setCorrectAnswer(correctAnswer + 1))
    }

    if (questionIndex + 1 < results?.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/result', { replace: true })
    }
  }

  if (loading) return <Loader height={70} width={70} loaderColor="#4B56D2" />
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
          Correct: <span className="font-bold text-primary">{correctAnswer}</span> / {results?.length}
        </p>
        <p className="text-xl">
          Incorrect: <span className="font-bold text-red-500">{incorrectAnswer}</span> / {results?.length}
        </p>
      </div>
      <Timer time={results.length * 30} />
    </SectionContainer>
  )
}

export default Question
