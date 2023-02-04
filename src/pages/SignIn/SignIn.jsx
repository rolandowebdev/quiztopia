import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, Input, Loader, NavigateLink, Password } from '../../components'
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider'
import { SectionContainer } from '../../layouts'

const ERROR_CODE = {
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  TOO_MANY_REQUEST: 'auth/too-many-requests',
}

export const SignIn = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { signin } = useAuth()

  const clearInputAndSetError = (errorMessage) => {
    emailRef.current.value = ''
    passwordRef.current.value = ''
    return setError(errorMessage)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signin(emailRef.current.value, passwordRef.current.value)
      navigate('/', { replace: true })
    } catch (error) {
      switch (error.code) {
        case ERROR_CODE.WRONG_PASSWORD:
          clearInputAndSetError('Wrong password!')
          break
        case ERROR_CODE.USER_NOT_FOUND:
          clearInputAndSetError('User not found!')
          break
        case ERROR_CODE.TOO_MANY_REQUEST:
          clearInputAndSetError('Too many login attempts. click on "Forgot Password" to reset your password.')
          break
        default:
          clearInputAndSetError('Failed to sign in!')
          break
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionContainer title>
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleSignIn} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Password id="password" label="password" ref={passwordRef} forgotPassword />
        <NavigateLink link="/forgot-password" textLink="Forgot Password?" linkStyle="text-end" />
        <Button type="submit" value="Sign In">
          {loading ? <Loader height={18} width={18} /> : 'sign in'}
        </Button>
      </form>
      <NavigateLink link="/signup" textInfo="Don't have an account?" textLink="sign up" />
    </SectionContainer>
  )
}
