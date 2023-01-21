import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCorrectAnswer, setIncorrectAnswer } from '../../app/question/questionSlice';
import { SectionContainer } from '../../layouts';
import { Button } from '../../components';
import Score from './Score';

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeQuestionIndex = JSON.parse(localStorage.getItem('questionIndex'));
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'));
  const storeIncorrectAnswer = JSON.parse(localStorage.getItem('incorrectAnswer'));

  const handleBackToDashboard = () => {
    localStorage.clear();
    dispatch(setCorrectAnswer(0));
    dispatch(setIncorrectAnswer(0));
    navigate('/', { replace: true });
  };

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold">Your Final Result🎉</h2>
        <Score
          amountOfQuestion={storeQuestionIndex}
          correctAnswer={storeCorrectAnswer}
          incorrectAnswer={storeIncorrectAnswer}
        />
      </div>
      <Button onClick={handleBackToDashboard} type="button">
        Back to Dashboard
      </Button>
    </SectionContainer>
  );
};

export default Result;
