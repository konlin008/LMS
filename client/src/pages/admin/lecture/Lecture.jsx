import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ lecture, index }) => {
    const navigate = useNavigate()
    const goToUpdateLectrue = () => {
        navigate(`${lecture._id}`)
    }
    return (
        <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] rounded-md my-2 h-10 px-2'>
            <h1 className='font-bold text-gray-800 dark:text-gray-100'>
                Lecture - {index + 1}: {lecture.title}
            </h1>
            <Edit
                onClick={goToUpdateLectrue}
                size={20}
                className='cursor-pointer text-gray-600 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400' />
        </div>
    )
}

export default Lecture