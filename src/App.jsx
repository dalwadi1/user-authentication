import { Route, Routes } from 'react-router-dom'
import Home from './Views/Home'
import SignUp from './Views/Authentication/SignUp'
import HomeCon from './Views/Nav'
import SignIn from './Views/Authentication/SignIn'
import UserDesh from './Views/Pages/UserDesh'
import ForgotPass from './Views/Authentication/ForgotPass'
import SendMail from './Views/Authentication/SendMail'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/user-desh' element={<UserDesh />} />
        <Route path='/send-mail' element={<SendMail />} />
        <Route path='/forgot-pass/:token' element={<ForgotPass />} />
      </Routes>
    </>
  )
}

export default App
