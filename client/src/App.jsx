import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import HeroSection from './pages/student/heroSection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import { Courses } from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import SideBar from './pages/admin/SideBar'
import Dashboard from './pages/admin/DashBoard'
import CoursesTable from './pages/admin/course/CoursesTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
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
          element: <Login />
        },
        {
          path: 'myLearning',
          element: <MyLearning />
        },
        {
          path: 'profile',
          element: <Profile />

        },
        {
          path: 'course/search',
          element: <SearchPage />

        },
        {
          path: 'course-details/:courseId',
          element: <CourseDetails />
        },
        {
          path: 'course-progress/:courseId',
          element: <CourseProgress />
        },
        {
          path: 'admin',
          element: <SideBar />,
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            {
              path: 'course',
              element: <CoursesTable />
            },
            {
              path: 'course/create',
              element: <AddCourse />
            },
            {
              path: 'course/:courseId',
              element: <EditCourse />
            },
            {
              path: 'course/:courseId/lecture',
              element: <CreateLecture />
            },
            {
              path: 'course/:courseId/lecture/:lectureId',
              element: <EditLecture />
            }
          ]
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
