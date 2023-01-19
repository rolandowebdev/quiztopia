import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';

import { Button } from '../../components';
import { SectionContainer } from '../../layouts';
import { generateRandom } from '../../libs/generateRandom';

import useAxios from '../../hooks/useAxios';
import { setScore } from '../../app/question/questionSlice';

const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const { questionCategory, questionDifficulty, questionType, amountOfQuestion, score } = useSelector(
    (state) => state.question
  );

  // generate api
  let apiUrl = `/api.php?amount=${amountOfQuestion}`;
  if (questionCategory) apiUrl = apiUrl.concat(`&category=${questionCategory}`);
  if (questionDifficulty) apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
  if (questionType) apiUrl = apiUrl.concat(`&type=${questionType}`);

  const { response, loading, error } = useAxios({ url: apiUrl });

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      const answers = [...question.incorrect_answers];
      // make correct answer random position
      answers.splice(generateRandom(question.incorrect_answers.length), 0, question.correct_answer);
      setOptions(answers);
    }
  }, [response, questionIndex]);

  const handleAnswer = (e) => {
    const question = response.results[questionIndex];

    if (e.target.textContent === question.correct_answer) {
      dispatch(setScore(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/result', { replace: true });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <SectionContainer title>
      <h2 className="text-3xl">Question {questionIndex + 1}</h2>
      <p className="my-3 text-lg">{decode(response?.results[questionIndex]?.question)}</p>
      <div className="flex flex-col justify-center w-full gap-4">
        {options.map((option) => (
          <Button onClick={handleAnswer} type="button" key={option}>
            {decode(option)}
          </Button>
        ))}
      </div>
      <p>
        Your Score : {score} / {response?.results.length}
      </p>
    </SectionContainer>
  );
};

export default Question;
