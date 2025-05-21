
import { useGetCourseStatusQuery } from "@/features/apis/purchaseApi";
import { Navigate, useParams } from "react-router-dom";

const PurchasedCourseProtectedRoute = ({ children }) => {
    const { courseId } = useParams();
    const { data, isloading } = useGetCourseStatusQuery({ courseId })
    if (isloading) {
        return <p>Loading...</p>
    }

    return data?.purchased ? children : <Navigate to={`/course-details/${courseId}`} />
}


export default PurchasedCourseProtectedRoute;