import { useState, useEffect, useContext, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../libs/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // for use context

const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // get data user from firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) setCurrentUser(null);
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserAuthProvider;
