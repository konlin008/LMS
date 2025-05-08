import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckMutation } from '@/features/apis/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const BuyCourseBtn = (courseId) => {
    const [CreateCheck, { data, isLoading, isSuccess, isError, error }] = useCreateCheckMutation()
    const purchaseCourseHandler = async () => {
        await CreateCheck({ courseId })
    }
    useEffect(() => {
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data?.url
            }
            else {
                toast.error("Invalid Responce")
            }
        }
        if (isError) {
            toast.error(error?.data?.msg || 'Faild To Create Checkout')
        }
    }, [data, isSuccess, isError, error])
    return (

        <Button onClick={purchaseCourseHandler} className={'w-full'}>
            {
                isLoading ? <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </> : 'Buy Course'
            }

        </Button>
    )
}

export default BuyCourseBtn