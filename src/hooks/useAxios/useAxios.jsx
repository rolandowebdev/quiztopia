import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export const useAxios = ({ url }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url)
        setResponse(res.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { response, loading, error }
}
