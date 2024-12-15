import './App.css'
import {Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/user/UserLogin'
import UserSignup from './pages/user/UserSignup'
import CaptainLogin from './pages/captain/CaptainLogin'
import CaptainSignup from './pages/captain/CaptainSignup';
import Home from './pages/Home'

const App = () => {

  return (
    <div>
  <Routes>
    <Route path='/'element={<Start/>} />
    <Route path='/login' element={<UserLogin />} />   
     <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home'element={<Home/>} />

        </Routes>
        
    </div>
    
  )
}

export default App;
