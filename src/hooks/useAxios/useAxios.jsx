import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL // base url

export const useAxios = ({ url }) => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [url])

  return { response, loading, error }
}
