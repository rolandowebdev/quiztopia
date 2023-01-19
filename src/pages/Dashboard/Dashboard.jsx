import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  setQuestionCategory,
  setQuestionDifficulty,
  setQuestionType,
  setAmountOfQuestion
} from '../../app/question/questionSlice';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import useAxios from '../../hooks/useAxios';

import { Button, Select, Input } from '../../components';
import { SectionContainer } from '../../layouts';
import { difficultyOptions, questionTypeOptions } from '../../utils/menu';

const Dashboard = () => {
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const questionTypeRef = useRef(null);
  const amountQuestionRef = useRef(null);
  const [errorSignOut, setErrorSignOut] = useState('');

  const { signout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, error, loading } = useAxios({ url: '/api_category.php' });

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/signin', { replace: true });
    } catch {
      setErrorSignOut('Failed to sign out!');
    }
  };

  const handleQuestion = (e) => {
    e.preventDefault();
    dispatch(setQuestionCategory(categoryRef.current.value));
    dispatch(setQuestionDifficulty(difficultyRef.current.value));
    dispatch(setQuestionType(questionTypeRef.current.value));
    dispatch(setAmountOfQuestion(amountQuestionRef.current.value));
    navigate('/questions', { replace: true });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Some went wrong!</p>;

  return (
    <SectionContainer title>
      <p className="text-lg text-center">
        Select menu below for playing <span className="font-semibold text-primary">QuizTopia</span>
      </p>
      <form onSubmit={handleQuestion} className="flex flex-col w-full gap-4">
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

export default Dashboard;
