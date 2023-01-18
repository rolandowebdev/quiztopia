import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { FormContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';

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
        case 'auth/wrong-password':
          clearInputAndSetError('Wrong password!');
          break;
        case 'auth/user-not-found':
          clearInputAndSetError('User not found!');
          break;
        case 'auth/too-many-requests':
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
    <FormContainer>
      {error && <p className="text-center">{error}</p>}
      <form onSubmit={handleSignIn} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Input id="password" label="password" ref={passwordRef} type="password" forgotPassword />
        <Button type="submit">{loading ? 'loading...' : 'sign in'}</Button>
      </form>
      <FormFooter textInfo="Don't have an account?" textLink="sign up" link="/signup" />
    </FormContainer>
  );
};

export default SignIn;
