import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  setQuestionCategory,
  setQuestionDifficulty,
  setQuestionType,
  setAmountOfQuestion
} from '../../app/question/questionSlice';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { useAxios } from '../../hooks';

import { Button, Select, Input, Loader, Alert } from '../../components';
import { SectionContainer } from '../../layouts';
import { difficultyOptions, questionTypeOptions } from '../../utils/menu';

const Dashboard = () => {
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const questionTypeRef = useRef(null);
  const amountQuestionRef = useRef(null);

  const { signout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, error, loading } = useAxios({ url: '/api_category.php' });

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/signin', { replace: true });
    } catch {
      console.log('Failed to sign out!');
    }
  };

  const handleQuestion = (e) => {
    e.preventDefault();

    if (categoryRef.current.value !== 'select category') {
      dispatch(setQuestionCategory(categoryRef.current.value));
    }

    if (difficultyRef.current.value !== 'select difficulty') {
      if (questionTypeRef.current.value === 'boolean') dispatch(setQuestionDifficulty('medium'));
      else dispatch(setQuestionDifficulty(difficultyRef.current.value));
    }

    if (questionTypeRef.current.value !== 'select type') {
      dispatch(setQuestionType(questionTypeRef.current.value));
    }

    dispatch(setAmountOfQuestion(amountQuestionRef.current.value));
    navigate('/question', { replace: true });
  };

  if (loading) return <Loader height={70} width={70} loaderColor="#4B56D2" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <SectionContainer title>
      <p className="text-lg text-center">Select menu below before playing</p>
      <form onSubmit={handleQuestion} className="flex flex-col w-full gap-4">
        <Select id="category" options={response?.trivia_categories} label="category" ref={categoryRef} />
        <Select id="difficulty" options={difficultyOptions} label="difficulty" ref={difficultyRef} />
        <Select id="questionType" options={questionTypeOptions} label="type" ref={questionTypeRef} />
        <Input
          id="amount"
          label="amount of question"
          type="number"
          ref={amountQuestionRef}
          max={18}
          min={1}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" value="Get Started">
            Get Started
          </Button>
          {localStorage.getItem('questions') && (
            <Button type="button" value="Resume">
              <Link to="resume-question">Resume</Link>
            </Button>
          )}
        </div>
      </form>
      <Button type="button" onClick={handleSignOut} value="Sign Out">
        Sign Out
      </Button>
    </SectionContainer>
  );
};

export default Dashboard;
