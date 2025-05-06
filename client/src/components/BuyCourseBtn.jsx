import React from 'react'
import { Button } from './ui/button'
import { useCreateCheckMutation } from '@/features/apis/purchaseApi'

const BuyCourseBtn = (courseId) => {
    const [CreateCheck, { isLoading }] = useCreateCheckMutation()
    const purchaseCourseHandler = async () => {
        await CreateCheck({ courseId })
    }
    return (

        <Button onClick={purchaseCourseHandler} className={'w-full'}>
            {isLoading ? '' : ''}
            Buy Course
        </Button>
    )
}

export default BuyCourseBtn