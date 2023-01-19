import { useState, useRef } from 'react';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { Button, Input, FormFooter } from '../../components';
import { SectionContainer } from '../../layouts';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const emailRef = useRef(null);
  const { resetPassword } = useAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Sucessfull, Check your email for reset password!');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        return setError('User not found!');
      }
      setError('Failed to reset password!');
    } finally {
      emailRef.current.value = '';
      setLoading(false);
    }
  };

  return (
    <SectionContainer>
      {message && <p className="text-center">{message}</p>}
      {error && <p className="text-center">{error}</p>}
      <form onSubmit={handleForgotPassword} className="flex flex-col w-full gap-4">
        <Input id="email" label="email" ref={emailRef} type="email" placeholder="Type your email here..." />
        <Button type="submit">{loading ? 'loading...' : 'reset password'}</Button>
      </form>
      <FormFooter textInfo="Back to" textLink="sign in" link="/signin" />
    </SectionContainer>
  );
};

export default ForgotPassword;
