import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Badge } from "@/components/ui/badge"
import React from 'react'

const Course = ({ course }) => {
    console.log(course);
    return (
        <Card className='overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300 pt-0 '>
            <div className='relative'>
                <img src={`${course?.courseThumbnail}`} alt='Course'
                    className='w-full h-36 rounded-t-lg' />
            </div>
            <CardContent className='flex flex-col space-y-3 w-full'>
                <h1 className='hover:underline font-bold text-lg truncate'>{course?.courseTitle}</h1>
                <div className='flex items-center gap-3'>
                    <Avatar>

                        <AvatarImage src={`${course?.creator.photoUrl}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex items-center gap-6 '>
                        <h1>Aman Mondal</h1>
                        <Badge className='bg-[#2C5F2D] text-white text-xs rounded-full'>Advance</Badge>
                    </div>

                </div>
                <div>
                    <span className='text-lg font-bold'>₹499</span>
                </div>
            </CardContent>

        </Card>
    )
}

export default Course