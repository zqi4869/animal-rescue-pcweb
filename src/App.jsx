import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from './views/login/Login'
import Home from './views/home/Home'
import Profile from './views/profile/Profile'
import Animals from './views/animals/Animals'
import Adopt from './views/adopt/Adopt'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home" element={<Home />} >
            <Route path="/home/profile" element={<Profile />} />
            <Route path="/home/animals" element={<Animals />} />
            <Route path="/home/adopt" element={<Adopt />} />
          </Route>
          {/*<Route path="*" element={<404 />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
