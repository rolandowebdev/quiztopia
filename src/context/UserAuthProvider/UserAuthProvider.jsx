import { useState, useEffect, useContext, createContext, useCallback, useMemo } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../../libs/firebaseConfig'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([])

  const signup = useCallback((email, password) => createUserWithEmailAndPassword(auth, email, password), [])
  const signin = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), [])
  const signout = useCallback(() => signOut(auth), [])
  const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) setCurrentUser(null)
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      signup,
      signin,
      signout,
      resetPassword,
    }),
    [currentUser, signup, signin, signout, resetPassword]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
