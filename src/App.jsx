import { Routes, Route } from 'react-router-dom';

import { SignUp, SignIn, Home } from './pages';
import { PageContainer } from './layouts';

const App = () => (
  <PageContainer>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </PageContainer>
);
export default App;
