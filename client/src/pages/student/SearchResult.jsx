import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ course }) => {
    return (
        <div className='flex flex-col md:flex-row md:w-auto justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4'>
            <Link to={`course-details/${course?._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENnzxQqbI-81nAiJgYZwiowr40wrkvrnBqw&s" alt="Course Thumbnail" className='h-32 w-full md:w-56 object-cover rounded' />
            </Link>
            <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-lg'>Course title</h1>
                <p className='font-semibold text-gray-600'>SubTitle</p>
                <p className='font-semibold text-gray-500'>Instructor: <span>Name</span> </p>
                <Badge w-fit mt-2 md:mt-0>Advance</Badge>
            </div>
        </div>
    )
}

export default SearchResult 