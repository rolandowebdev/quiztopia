import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';

import { Button, Select, Input } from '../../components';
import { FormContainer } from '../../layouts';

const Home = () => {
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const questionTypeRef = useRef(null);
  const amountQuestionRef = useRef(null);

  const [error, setError] = useState('');

  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/signin', { replace: true });
    } catch {
      setError('Failed to sign out!');
    }
  };

  return (
    <FormContainer>
      <p className="text-lg text-center">
        Select menu below for playing <span className="font-semibold text-primary">QuizTopia</span>
      </p>
      <form className="flex flex-col w-full gap-4">
        <Select id="category" label="category" ref={categoryRef} />
        <Select id="difficulty" label="difficulty" ref={difficultyRef} />
        <Select id="questionType" label="question type" ref={questionTypeRef} />
        <Input id="amount" label="amount of question" type="number" ref={amountQuestionRef} />
        <Button type="submit">Get Started</Button>
      </form>
      {error && <p className="text-center">{error}</p>}
      <Button type="button" onClick={handleSignOut}>
        Logout
      </Button>
    </FormContainer>
  );
};

export default Home;
