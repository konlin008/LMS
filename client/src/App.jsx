import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import HeroSection from "./pages/student/HeroSection.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import { RouterProvider } from "react-router";
import { Courses } from "./pages/student/Courses.jsx";
import MyLearning from "./pages/student/MyLearning.jsx";
import Profile from "./pages/student/Profile.jsx";
import SideBar from "./pages/admin/SideBar.jsx";
import Dashboard from "./pages/admin/DashBoard.jsx";
import CoursesTable from "./pages/admin/course/CoursesTable.jsx";
import AddCourse from "./pages/admin/course/AddCourse.jsx";
import EditCourse from "./pages/admin/course/EditCourse.jsx";
import CreateLecture from "./pages/admin/lecture/CreateLecture.jsx";
import EditLecture from "./pages/admin/lecture/EditLecture.jsx";
import CourseDetails from "./pages/student/CourseDetails.jsx";
import CourseProgress from "./pages/student/CourseProgress.jsx";
import SearchPage from "./pages/student/SearchPage.jsx";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoute.jsx";
import PurchasedCourseProtectedRoute from "./components/purchaseCourseProtected.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              <Courses />
            </>
          ),
        },
        {
          path: "login",
          element: (
            <AuthenticatedUser>
              <Login />
            </AuthenticatedUser>
          ),
        },
        {
          path: "myLearning",
          element: (
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "course/search",
          element: (
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-details/:courseId",
          element: (
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <PurchasedCourseProtectedRoute>
                <CourseProgress />
              </PurchasedCourseProtectedRoute>
            </ProtectedRoute>
          ),
        },
        {
          path: "admin",
          element: (
            <AdminRoute>
              <SideBar />
            </AdminRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course",
              element: <CoursesTable />,
            },
            {
              path: "course/create",
              element: <AddCourse />,
            },
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
