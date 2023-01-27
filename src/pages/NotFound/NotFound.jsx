import { useNavigate } from 'react-router-dom'

import { SectionContainer } from '../../layouts'
import { Button } from '../../components'

const NotFound = () => {
  const navigate = useNavigate()
  const handleBackToDashboard = () => navigate('/')
  return (
    <SectionContainer>
      <h1 className="font-bold tracking-wider text-primary text-9xl">404</h1>
      <p className="w-full text-2xl text-center">Sorry, theres nothing here😢</p>
      <Button type="button" onClick={handleBackToDashboard} value="Back to home page">
        Back to Dashboard
      </Button>
    </SectionContainer>
  )
}

export default NotFound
