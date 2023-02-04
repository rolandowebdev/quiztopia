import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input, Select } from '../../components'
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider'
import { categoryOptions, difficultyOptions } from '../../data/menu'
import { SectionContainer } from '../../layouts'

import { setAmountOfQuestion, setQuestionCategory, setQuestionDifficulty } from '../../app/question/questionSlice'

export const Dashboard = () => {
  const categoryRef = useRef(null)
  const difficultyRef = useRef(null)
  const amountQuestionRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { signout } = useAuth()

  const handleSignOut = async () => {
    try {
      await signout()
      localStorage.clear()
      navigate('/signin', { replace: true })
    } catch {
      console.log('Failed to sign out!')
    }
  }

  const handleQuestionCategory = (e) => {
    e.preventDefault()

    if (categoryRef.current.value !== 'any category') {
      dispatch(setQuestionCategory(categoryRef.current.value))
    }

    if (difficultyRef.current.value !== 'any difficulty') {
      dispatch(setQuestionDifficulty(difficultyRef.current.value))
    }

    dispatch(setAmountOfQuestion(amountQuestionRef.current.value))
    navigate('/question', { replace: true })
  }

  return (
    <SectionContainer title>
      <p className="text-lg text-center">Select menu below before playing</p>
      <form onSubmit={handleQuestionCategory} className="flex flex-col w-full gap-4">
        <Select id="category" options={categoryOptions} label="category" ref={categoryRef} />
        <Select id="difficulty" options={difficultyOptions} label="difficulty" ref={difficultyRef} />
        <Input id="amount" label="amount of question" type="number" ref={amountQuestionRef} max={30} min={1} />
        <div className="flex items-center gap-2">
          <Button type="submit" value="Get Started">
            Get Started
          </Button>
          {localStorage.getItem('questions') && (
            <Button type="button" value="Resume">
              <Link to="resume-question">Resume</Link>
            </Button>
          )}
        </div>
      </form>
      <Button type="button" onClick={handleSignOut} value="Sign Out">
        Sign Out
      </Button>
    </SectionContainer>
  )
}
