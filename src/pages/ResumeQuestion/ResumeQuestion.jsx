import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { decode } from 'html-entities';
import { generateRandom } from '../../libs/generateRandom';
import { SectionContainer } from '../../layouts';
import { Button, Timer } from '../../components';

const ResumeQuestion = () => {
  const storeQuestions = JSON.parse(localStorage.getItem('questions'));
  const storeQuestionIndex = JSON.parse(localStorage.getItem('questionIndex'));
  const storeCorrectAnswer = JSON.parse(localStorage.getItem('correctAnswer'));
  const storeIncorrectAnswer = JSON.parse(localStorage.getItem('incorrectAnswer'));

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(parseInt(storeQuestionIndex, 10) || 0);
  const [correctAnswer, setCorrectAnswer] = useState(parseInt(storeCorrectAnswer, 10) || 0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(parseInt(storeIncorrectAnswer, 10) || 0);

  // TODO: store questionIndex, correctAnswer & incorrectAnswer to localstorage
  useEffect(() => {
    if (storeQuestions?.length) {
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex));
      localStorage.setItem('correctAnswer', JSON.stringify(correctAnswer));
      localStorage.setItem('incorrectAnswer', JSON.stringify(incorrectAnswer));
    }
  }, [questionIndex, correctAnswer, incorrectAnswer]);

  // TODO: make correct answer random position every user choose answer
  useEffect(() => {
    if (storeQuestions?.length) {
      const question = storeQuestions[questionIndex];
      const answer = [...(question?.incorrect_answers || [])];
      // * make correct answer random position
      answer.splice(generateRandom(question?.incorrect_answers.length), 0, question?.correct_answer);
      setOptions(answer);
    }
  }, [questionIndex, correctAnswer, incorrectAnswer]);

  // TODO: handle when user choose answer
  const handleAnswer = (e) => {
    const question = storeQuestions[questionIndex];

    if (question && question.incorrect_answers) {
      if (typeof question.incorrect_answers === 'object') {
        question.incorrect_answers.map(
          (data) =>
            e.target.textContent === data &&
            setIncorrectAnswer((prevIncorrectAnswer) => prevIncorrectAnswer + 1)
        );
      }
    }

    if (e.target.textContent === question?.correct_answer) {
      setCorrectAnswer((prevCorrectAnswer) => prevCorrectAnswer + 1);
    }

    if (e.target.textContent === question?.incorrect_answers) {
      setIncorrectAnswer((prevIncorrectAnswer) => prevIncorrectAnswer + 1);
    }

    if (questionIndex + 1 < storeQuestions.length) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      localStorage.setItem('questionIndex', JSON.stringify(questionIndex));
    } else {
      navigate('/result', { replace: true });
    }
  };

  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold text-primary">Question {questionIndex + 1}</h2>
      <p className="my-3 text-lg">{decode(storeQuestions[questionIndex]?.question)}</p>
      <div className="flex flex-col justify-center w-full gap-4">
        {options.map((option) => (
          <Button onClick={handleAnswer} type="button" key={option}>
            {decode(option)}
          </Button>
        ))}
      </div>
      <p className="text-xl">
        Correct Answer : <span className="font-bold text-primary">{correctAnswer}</span> /{' '}
        {storeQuestions?.length}
      </p>
      <Timer time={storeQuestions.length * 30} />
    </SectionContainer>
  );
};

export default ResumeQuestion;
