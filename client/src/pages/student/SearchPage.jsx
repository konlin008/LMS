import React from 'react'
import Filter from './Filter'
import CourseSkeleton from '@/components/CourseSkeleton'
import Course from './Course'
import SearchResult from './SearchResult'

const SearchPage = () => {
    const isLoading = false
    const isEmpty = false
    return <div div className='max-w-7xl mx-auto p-4 md:p-8 mt-7' >
        <div className='my-6'>
            <h1>Result For html</h1>
            <p>Showing Result For{" "}
                <span className='text-blue-700 font-bold italic'>Frontend Devloper</span></p>
        </div>
        <div className='flex flex-col md:flex-row font-bold gap-10'>
            <Filter />
            <div className='flex flex-col '>
                {
                    isLoading ? [1, 2, 3, 4, 5].map((index) => {
                        return <CourseSkeleton key={index} />
                    }) : isEmpty ? (<p>No Course Found</p>) : (
                        [1, 2, 3, 4]?.map((course, index) => <SearchResult course={course} key={index} />)
                    )
                }
            </div>
        </div>
    </div >

}

export default SearchPage