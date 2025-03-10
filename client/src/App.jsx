import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import HeroSection from './pages/student/heroSection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import { Courses } from './pages/student/Courses'
function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: (<>
            <HeroSection />
            <Courses />
          </>)
        },
        {
          path: 'login',
          element: (
            <>
              <Login />
            </>
          )
        }
      ]
    }
  ])
  return (
    <main>
      <RouterProvider router={appRouter} />


    </main>
  )
}

export default App
