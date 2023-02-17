import React, { useEffect, useState } from 'react'

import { productsApi } from '~/API/productsApi'

const BrandFilter = ({ filters, onChange }) => {
   const [brands, setBrands] = useState([])
   const [selected, setSelected] = useState([])
   
   const handleChangeBrand = (brand) => {
      setSelected(
         prev => {
            if (selected.includes(brand)) {
               return prev.filter(x => x !== brand)
            } else {
               return [...prev, brand]
            }
         }
      )
   }
   useEffect(()=>{
      setSelected([])
   },[filters.active])
   
   useEffect(() => {
      onChange(selected)
   }, [selected])

   useEffect(() => {
      (async function () {
         const data = await productsApi.getBrand({
            category: filters.category,
         })
         setBrands(data)
      })()
   }, [filters.category])

   return (
      <div className='flex flex-col mb-8'>
         <h6 className='text-xl font-medium'>Category</h6>
         {
            brands.map((name, index) => (
               <label key={index} className='checkbox-container' >
                  <input
                     type="checkbox"
                     className='mr-2'
                     onChange={() => handleChangeBrand(name)}
                     checked={selected.includes(name)}
                  />
                  <span>{name}</span>
               </label>
            ))
         }
      </div>
   )
}

export default BrandFilter
