import { useState, useEffect, useContext, createContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../libs/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // for use context

const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signin = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // get data user from firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserAuthProvider;
