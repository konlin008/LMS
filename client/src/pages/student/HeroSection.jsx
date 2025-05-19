import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [serachQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault();
        if (serachQuery.trim() !== '') {
            navigate(`course/search?query=${serachQuery} `)
        }
        setSearchQuery('')
    }

    return (
        <div className=" bg-gradient-to-r from-[#97BC62] to-[#2C5F2D] dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center ">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-white text-4xl font-bold mb-4">
                    Find the Best Courses For You
                </h1>
                <p className="text-gray-100 dark:text-gray-400 mb-8">
                    Discover, Learn, and upskill with our wide range of courses
                </p>
                <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
                    <Input
                        type="text"
                        value={serachQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        placeholder='Search Course'
                        className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                    <Button type={'submit'} className='bg-[#97BC62] dark:bg-[#97BC62] px-6 py-3 rounded-r-full hover:bg-[#2C5F2D] dark:hover:bg-[#2C5F2D]'>Search</Button>
                </form>
                <Button className='bg-white dark:bg-gray-800 text-[#2C5F2D] rounded-full hover:bg-gray-200'>
                    Explore Courses
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
