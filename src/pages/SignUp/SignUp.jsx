import { useRef, useState } from 'react';

import { FormContainer } from '../../layouts';
import { Input, Button, FormFooter } from '../../components';
import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, currentUser } = useAuth(); // get from UserAuth context

  // clear input field function
  const clearInputAndSetError = (errorMessage) => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    passwordConfirmRef.current.value = '';
    return setError(errorMessage);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (emailRef.current.value === currentUser?.email) {
      return clearInputAndSetError('Email already in use!');
    }

    if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
      return clearInputAndSetError('Password should have minimum 6 characters!');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return clearInputAndSetError('Password do not match!');
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to create an account!');
    } finally {
      setLoading(false);
      clearInputAndSetError(null);
    }
  };

  return (
    <FormContainer>
      {error && <p>{error}</p>}
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
