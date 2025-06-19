import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Check_Auth from './components/Check-Auth'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/'
          element={
            <Check_Auth protect={true}>
              <Tickets />
            </Check_Auth>
          } />

        <Route path='/tickets/:id'
          element={
            <Check_Auth protect={true}>
              <Ticket />
            </Check_Auth>
          }
        />

        <Route
          path="/login"
          element={
            <Check_Auth protected={false}>
              <Login />
            </Check_Auth>
          }
        />

        <Route
          path="/signup"
          element={
            <Check_Auth protected={false}>
              <Signup />
            </Check_Auth>
          }
        />

        <Route
          path="/admin"
          element={
            <Check_Auth protected={true}>
              <Admin />
            </Check_Auth>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
