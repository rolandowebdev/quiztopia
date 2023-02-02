import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertNumberToTimer } from '../../libs/convertNumberToTimer'

export const Timer = ({ time }) => {
  const [timer, setTimer] = useState(time)
  const navigate = useNavigate()

  useEffect(() => {
    if (timer < 0) navigate('/result', { replace: true })
  }, [timer, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((seconds) => seconds - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <h1 className="mt-2 text-2xl font-bold text-primary">{convertNumberToTimer(timer)}</h1>
}
