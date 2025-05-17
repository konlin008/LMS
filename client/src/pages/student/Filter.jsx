import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const Filter = () => {
  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "fullstack", label: "Fullstack" },
    { id: "devops", label: "DevOps" },
    { id: "mobile", label: "Mobile Development" },
    { id: "ai", label: "Artificial Intelligence" },
    { id: "data-science", label: "Data Science" },
    { id: "cloud", label: "Cloud Computing" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "game-dev", label: "Game Development" },
    { id: "blockchain", label: "Blockchain" },
    { id: "embedded", label: "Embedded Systems" },
    { id: "quality", label: "Quality Assurance" },
  ];

  return (
    <div className='w-full md:w-[20%]'>
      <div className=' flex justify-between items-center gap-5'>
        <h1 className='font-semibold text-lg md:text-lg '>Filter Options </h1>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={'Sort By'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="frontend">Low to High</SelectItem>
              <SelectItem value="backend">High Tto Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h1 className='font '>CATEGORY</h1>
        {
          categories.map((category) => {
            return (
              <div className='flex items-center space-x-2 my-2'>
                

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Filter