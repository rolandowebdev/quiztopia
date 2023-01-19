import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setScore, setAmountOfQuestion } from '../../app/question/questionSlice';
import { SectionContainer } from '../../layouts';
import { Button } from '../../components';

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { score } = useSelector((state) => state.question);

  const handleBackToDashboard = () => {
    dispatch(setScore(0));
    dispatch(setAmountOfQuestion(50));
    navigate('/');
  };

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-6">
        <p className="text-2xl">Your Final Score🎉</p>
        <h3 className="flex items-end text-7xl text-primary font-logo">
          {score}
          <span className="text-[20px] text-gray-400">/ 10</span>
        </h3>
      </div>
      <Button onClick={handleBackToDashboard} type="button">
        Back to Dashboard
      </Button>
    </SectionContainer>
  );
};

export default Result;
