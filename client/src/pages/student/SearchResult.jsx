import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ course }) => {
    return (
        <div className='flex flex-col md:flex-row md:w-auto  items-start md:items-center border-b border-gray-300 py-4 gap-4'>
            <Link to={`/course-details/${course?._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-60 '>
                <img src={course?.courseThumbnail} alt="Course Thumbnail" className='h-32 w-full   object-cover rounded' />


                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-xl'>{course?.courseTitle}</h1>
                    <p className='font-semibold text-gray-800 dark:text-gray-300 truncate whitespace-nowrap overflow-hidden w-full md:w-[20rem]'>
                        {course?.courseSubTitle}
                    </p>
                    <p className='font-semibold text-gray-500 dark:text-gray-400'>Instructor: <span>{course?.creator.name}</span> </p>
                    <p className='font-semibold text-gray-500 dark:text-gray-400'>Price: {course?.coursePrice}</p>
                    <Badge className="w-fit mt-2 md:mt-0">{course?.courseLevel}</Badge>
                </div>
            </Link>
        </div >
    )
}

export default SearchResult         