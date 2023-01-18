import { Routes, Route } from 'react-router-dom';

import { SignUp, SignIn, Home } from './pages';
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
    </Routes>
  </PageContainer>
);
export default App;
