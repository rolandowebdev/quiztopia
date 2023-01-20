import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertNumberToTimer } from '../../libs/convertNumberToTimer';

const Timer = ({ time, isRenderingRouter }) => {
  const [timer, setTimer] = useState(time);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer < 0) navigate('/result', { replace: true });
  }, [timer, navigate]);

  useEffect(() => {
    if (!isRenderingRouter) {
      const interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRenderingRouter]);

  return <h1 className="text-2xl font-bold text-primary">{convertNumberToTimer(timer)}</h1>;
};

export default Timer;
