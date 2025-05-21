import React from 'react'
import Course from './Course'
import { useLoadUserProfileQuery } from '@/features/apis/authApi';

const MyLearning = () => {
    const { data, isLoading } = useLoadUserProfileQuery();
    const myCourses = data?.user.enrolledCourses
    return (
        <div className='max-w-7xl mx-auto my-10  px-4 md:px-0 '>
            <h1 className='font-bold text-2xl'> MY LEARNING</h1>
            <div className='my-5'>
                {isLoading ? (
                    <>
                        <MyLearningSkeleton />
                    </>
                ) : (
                    <>
                        {myCourses?.length === 0 ? (<p>
                            You Are Not Enrolled In Any Courses
                        </p>) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {myCourses.map((course) => {
                                    return (
                                        <div key={course._id}>
                                            <Course course={course} />
                                        </div>
                                    )
                                })}
                            </div>
                        )

                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default MyLearning
const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
            ></div>
        ))}
    </div>
);