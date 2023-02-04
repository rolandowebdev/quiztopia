import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PageContainer } from './layouts'
import { Dashboard, ForgotPassword, NotFound, Question, Result, ResumeQuestion, SignIn, SignUp } from './pages'
import { PrivateRoutes } from './routes'

export const App = () => (
  <PageContainer>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
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
        <Route path="/result" element={<Result />} />
        <Route path="/question" element={<Question />} />
        <Route path="/resume-question" element={<ResumeQuestion />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </PageContainer>
)
