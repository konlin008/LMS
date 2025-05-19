import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'

const Filter = ({ handelFilterChange }) => {
  const [selectedCategories, SetSelectedCategories] = useState([])
  const [sortByPrice, setSortByPrice] = useState("");
  const handelCategoryChange = (categoryId) => {
    SetSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId) ? prevCategories.filter((id) => id !== categoryId) : [...prevCategories, categoryId]
      handelFilterChange(newCategories, sortByPrice);
      return newCategories
    })
  }
  const handelSortByPrice = (SelectedValue) => {
    setSortByPrice(SelectedValue)
    handelFilterChange(selectedCategories, SelectedValue)
  }
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
        <Select onValueChange={handelSortByPrice}>
          <SelectTrigger>
            <SelectValue placeholder={'Sort By'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High Tto Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h1 className='font '>CATEGORY</h1>
        {
          categories.map((category, index) => {
            return (
              <div key={index} className='flex items-center space-x-2 my-2'>
                <Checkbox id={category.id} onChange={() => handelCategoryChange(category.id)} />
                <Label className={'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}>{category.label}</Label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Filter