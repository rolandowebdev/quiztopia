import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import useAxios from '../../hooks/useAxios';

import { Button, Select, Input } from '../../components';
import { SectionContainer } from '../../layouts';
import { difficultyOptions, questionTypeOptions } from '../../utils/menu';

const Home = () => {
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const questionTypeRef = useRef(null);
  const amountQuestionRef = useRef(null);

  const { response, error, loading } = useAxios({ url: '/api_category.php' });
  const [errorSignOut, setErrorSignOut] = useState('');

  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/signin', { replace: true });
    } catch {
      setErrorSignOut('Failed to sign out!');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Some went wrong!</p>;

  return (
    <SectionContainer>
      <p className="text-lg text-center">
        Select menu below for playing <span className="font-semibold text-primary">QuizTopia</span>
      </p>
      <form className="flex flex-col w-full gap-4">
        <Select id="category" options={response?.trivia_categories} label="category" ref={categoryRef} />
        <Select id="difficulty" options={difficultyOptions} label="difficulty" ref={difficultyRef} />
        <Select id="questionType" options={questionTypeOptions} label="question type" ref={questionTypeRef} />
        <Input id="amount" label="amount of question" type="number" ref={amountQuestionRef} />
        <Button type="submit">Get Started</Button>
      </form>
      {errorSignOut && <p className="text-center">{errorSignOut}</p>}
      <Button type="button" onClick={handleSignOut}>
        Logout
      </Button>
    </SectionContainer>
  );
};

export default Home;
