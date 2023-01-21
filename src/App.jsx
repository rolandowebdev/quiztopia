import { Routes, Route } from 'react-router-dom';

import { SignUp, SignIn, Dashboard, ForgotPassword, Question, Result, ResumeQuestion } from './pages';
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
      <Route path="/question" element={<Question />} />
      <Route path="/resume-question" element={<ResumeQuestion />} />
      <Route path="/result" element={<Result />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </PageContainer>
);
export default App;
