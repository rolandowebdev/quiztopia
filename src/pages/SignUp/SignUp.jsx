import { useRef, useState } from 'react';

import { FormContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';

const ERROR_CODE = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password'
};

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth(); // get from UserAuth context

  // clear input field function
  const clearInputAndSetError = (errorMessage) => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    passwordConfirmRef.current.value = '';
    return setError(errorMessage);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return clearInputAndSetError('Password do not match!');
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      clearInputAndSetError();
    } catch (err) {
      switch (err.code) {
        case ERROR_CODE.EMAIL_ALREADY_IN_USE:
          clearInputAndSetError('Email already in use!');
          break;
        case ERROR_CODE.WEAK_PASSWORD:
          clearInputAndSetError('Password should be at least 6 characters!');
          break;
        default:
          clearInputAndSetError('Failed to create an account!');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {error && <p className="text-center">{error}</p>}
      <form onSubmit={handleSignUp} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Input id="password" label="password" ref={passwordRef} type="password" />
        <Input id="confirmPassword" label="confirm password" ref={passwordConfirmRef} type="password" />
        <Button type="submit">{loading ? 'loading...' : 'sign up'}</Button>
      </form>
      <FormFooter textInfo="Already have an account?" textLink="sign in" link="/signin" />
    </FormContainer>
  );
};

export default SignUp;
