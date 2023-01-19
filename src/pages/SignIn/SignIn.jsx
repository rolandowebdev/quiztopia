import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { SectionContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';

const ERROR_CODE = {
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  TOO_MANY_REQUEST: 'auth/too-many-requests'
};

const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signin } = useAuth();

  // clear input field function
  const clearInputAndSetError = (errorMessage) => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    return setError(errorMessage);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate('/', { replace: true });
    } catch (err) {
      switch (err.code) {
        case ERROR_CODE.WRONG_PASSWORD:
          clearInputAndSetError('Wrong password!');
          break;
        case ERROR_CODE.USER_NOT_FOUND:
          clearInputAndSetError('User not found!');
          break;
        case ERROR_CODE.TOO_MANY_REQUEST:
          clearInputAndSetError('Too many login attempts. click on "Forgot Password" to reset your password.');
          break;
        default:
          clearInputAndSetError('Failed to sign in!');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer>
      {error && <p className="text-center">{error}</p>}
      <form onSubmit={handleSignIn} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Input id="password" label="password" ref={passwordRef} type="password" forgotPassword />
        <Button type="submit">{loading ? 'loading...' : 'sign in'}</Button>
      </form>
      <FormFooter textInfo="Don't have an account?" textLink="sign up" link="/signup" />
    </SectionContainer>
  );
};

export default SignIn;
