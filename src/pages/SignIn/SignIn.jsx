import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { SectionContainer } from '../../layouts';
import { Input, Button, FormFooter, Loader, Alert, Password } from '../../components';

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
          clearInputAndSetError(
            'Too many login attempts. click on "Forgot Password" to reset your password.'
          );
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
    <SectionContainer title>
      {error && <Alert message={error} type="error" />}
      <form onSubmit={handleSignIn} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Email..." />
        <Password id="password" label="password" ref={passwordRef} forgotPassword />
        <Link
          to="/forgot-password"
          className="block font-semibold text-right cursor-pointer text-primary hover:underline">
          Forgot Password?
        </Link>
        <Button type="submit" value="Sign In">
          {loading ? <Loader height={18} width={18} /> : 'sign in'}
        </Button>
      </form>
      <FormFooter textInfo="Don't have an account?" textLink="sign up" link="/signup" />
    </SectionContainer>
  );
};

export default SignIn;
