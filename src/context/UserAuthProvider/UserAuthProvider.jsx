/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useEffect, useContext, createContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../libs/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // for use context

const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    // get data user from firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserAuthProvider;
