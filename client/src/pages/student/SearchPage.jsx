import React, { useState } from 'react'
import Filter from './Filter'
import CourseSkeleton from '@/components/CourseSkeleton'
import SearchResult from './SearchResult'
import { useGetSearchCourseQuery } from '@/features/apis/courseApi'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")
    const [selectedCategory, SetSelectedCategory] = useState([])
    const [sortByPrice, setSortByPrice] = useState('')
    const { data, isSuccess, isLoading, isError } = useGetSearchCourseQuery({
        query: query,
        category: selectedCategory,
        sortByPrice
    });
    if (isError) {
        return <h1>Something Went Wrong</h1>
    }
    console.log(data);
    const isEmpty = !isLoading && data?.courses.length === 0;
    const handelFilterChange = (category, price) => {
        SetSelectedCategory(category)
        setSortByPrice(price)
    }
    return <div className='max-w-7xl mx-auto p-4 md:p-8 mt-7' >
        <div className='my-6'>
            <h1 className='font-bold text-xl md:text-2xl'>Result For "{query}"</h1>
            <p>Showing Result For{" "}
                <span className='text-blue-700 font-bold italic'>{query}</span></p>
        </div>
        <div className='flex flex-col md:flex-row font-bold gap-10'>
            <Filter handelFilterChange={handelFilterChange} />
            <div className='flex flex-col '>
                {
                    isLoading ? [1, 2, 3, 4, 5].map((course, index) => {
                        return <CourseSkeleton key={index} />
                    }) : isEmpty ? (<CourseNotFound />) : (
                        data?.courses.map((course) => <SearchResult course={course} key={course._id} />)
                    )
                }
            </div>
        </div>
    </div >

}
const CourseNotFound = () => {
    return (
        <div className="flex flex-col ml-40 items-center justify-center min-h-32 dark:bg-gray-900 p-6">
            <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
            <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
                Course Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Sorry, we couldn't find the course you're looking for.
            </p>
            <Link to="/" className="italic">
                <Button variant="link">Browse All Courses</Button>
            </Link>
        </div>
    );
};


export default SearchPage