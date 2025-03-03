
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import { Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/logIn' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
