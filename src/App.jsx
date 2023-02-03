import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SignUp, SignIn, Dashboard, ForgotPassword, Question, Result, ResumeQuestion, NotFound } from './pages'
import { PageContainer } from './layouts'
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
