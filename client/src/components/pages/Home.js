import TaskCard from '../tasks/TaskCard';
import AuthContext from '../../context/auth/authContext';
import { useContext, useEffect } from 'react';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <TaskCard />
    </div>
  );
};

export default Home;
