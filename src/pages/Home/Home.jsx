import { useAuth } from '../../context/UserAuthProvider/UserAuthProvider';

const Home = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser.email}</div>;
};

export default Home;
