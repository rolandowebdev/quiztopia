import { Routes, Route } from 'react-router-dom';

import { SignUp, SignIn, Home, ForgotPassword, Question } from './pages';
import { PageContainer } from './layouts';
import { PrivateRoutes } from './routes';

const App = () => (
  <PageContainer>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/question" element={<Question />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </PageContainer>
);
export default App;
