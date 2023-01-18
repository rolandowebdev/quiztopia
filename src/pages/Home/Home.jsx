import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';
import { Button } from '../../components';

const Home = () => {
  const [error, setError] = useState('');
  const { currentUser, signout } = useAuth();

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
    <div className="flex flex-col gap-2">
      {error && <p className="text-center">{error}</p>}
      {currentUser.email}
      <Button type="button" onClick={handleSignOut}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
