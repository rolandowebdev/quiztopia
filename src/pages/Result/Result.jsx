import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCorrectAnswer, setIncorrectAnswer } from '../../app/question/questionSlice';
import { SectionContainer } from '../../layouts';
import { Button } from '../../components';
import Score from './Score';

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { amountOfQuestion, correctAnswer, incorrectAnswer } = useSelector(
    (state) => state.question
  );

  const handleBackToDashboard = () => {
    dispatch(setCorrectAnswer(0));
    dispatch(setIncorrectAnswer(0));
    navigate('/');
  };

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold">Your Final Result🎉</h2>
        <Score
          amountOfQuestion={amountOfQuestion}
          correctAnswer={correctAnswer}
          incorrectAnswer={incorrectAnswer}
        />
      </div>
      <Button onClick={handleBackToDashboard} type="button">
        Back to Dashboard
      </Button>
    </SectionContainer>
  );
};

export default Result;
