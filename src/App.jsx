import { Routes, Route } from 'react-router-dom';

import { SignUp, SignIn, Dashboard, ForgotPassword, Question, Result } from './pages';
import { PageContainer } from './layouts';
import { PrivateRoutes } from './routes';

const App = () => (
  <PageContainer>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/questions" element={<Question />} />
      <Route path="/result" element={<Result />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </PageContainer>
);
export default App;
