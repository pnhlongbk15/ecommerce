import React, { useEffect, useState } from 'react'
import { productsApi } from '~/API/productsApi';

const CategoryFilter = ({ filters, onChange }) => {
   const [categories, setCategories] = useState([]);
   const [selected, setSelected] = useState([])

   const handleChangeCategory = (category) => {
      setSelected(
         prev => {
            if (selected.includes(category)) {
               //case tích rồi
               return prev.filter(n => n !== category)
            } else {
               //case chưa tích
               return [...prev, category]
            }
         }
      )
   }
   useEffect(()=>{
      setSelected([])
   },[filters.active])

   useEffect(()=>{
      // intial turn active: true
      onChange(selected)
   },[selected])

   useEffect(() => {
      (
         async () => {
            try {
               const data = await productsApi.getCategories()
               setCategories(data)
            } catch (error) {
               alert(error.message)
            }
         }
      )()
   }, [])
   
   // console.log('cate',categories)

   return (
      <div name='CategoryFilter' className='flex flex-col mb-8'>
         <h6 className='text-xl font-medium'>Category</h6>
         {
            categories.map((name, index) => (
               <label key={index} className='checkbox-container' >
                  <input 
                     type="checkbox"
                     className='mr-2'
                     onChange={()=> handleChangeCategory(name)}
                     checked={selected.includes(name)}
                  />
                  <span>{name}</span>
               </label>
            ))
         }
      </div>
   )
}

export default CategoryFilter
