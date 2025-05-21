import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetAllPurchasedCourseQuery } from '@/features/apis/purchaseApi'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Dashboard = () => {
    const { data, isSuccess, isLoading, isError } = useGetAllPurchasedCourseQuery();
    console.log(data?.purchaseCourse);
    if (isLoading) { return <h1>Loading...</h1> }
    if (isError) { return <h1>Error...</h1> }

    const purchasedCourse = data?.purchaseCourse || [];

    console.log(purchasedCourse);
    const courseData = purchasedCourse.map((course) => ({
        name: course.courseId.courseTitle,
        price: course.courseId.coursePrice
    }))
    const totaSales = purchasedCourse.length
    const totalRevenue = purchasedCourse.reduce((acc, elem) => acc + (elem.amount || 0), 0)
    return (
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-16'>
            <Card className={'shadow-lg hover:shadow-xl transition-shadow duration-300'}>
                <CardHeader>
                    <CardTitle>Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-3xl font-bold text-green-500'>{totaSales}</p>
                </CardContent>
            </Card>
            <Card className={'shadow-lg hover:shadow-xl transition-shadow duration-300'}>
                <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-3xl font-bold text-green-500'>{totalRevenue}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700">
                        Course Prices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={courseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                angle={-30}
                                textAnchor="end"
                                interval={0}
                            />
                            <YAxis stroke="#6b7280" />
                            <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#4a90e2" // Changed color to a different shade of blue
                                strokeWidth={3}
                                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard