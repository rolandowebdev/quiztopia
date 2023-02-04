import { useRef, useState } from 'react'

import { Alert, Button, Input, Loader, NavigateLink } from '../../components'
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider'
import { SectionContainer } from '../../layouts'

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const emailRef = useRef(null)
  const { resetPassword } = useAuth()

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Sucessfully!, Now you can check your email for reset password!')
    } catch (error) {
      if (error.code === 'auth/user-not-found') return setError('User not found!')
      setError('Failed to reset password!')
    } finally {
      emailRef.current.value = ''
      setLoading(false)
    }
  }

  return (
    <SectionContainer title>
      {message && <Alert message={message} />}
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleForgotPassword} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Button type="submit" value="Reset Password">
          {loading ? <Loader height={18} width={18} /> : 'reset password'}
        </Button>
      </form>
      <NavigateLink link="/signin" textLink="Sign In" textInfo="Back to" />
    </SectionContainer>
  )
}
