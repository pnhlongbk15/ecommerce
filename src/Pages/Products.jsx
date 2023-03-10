import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
//component
import ProductsFilter from '~/Components/Products/ProductsFilter'
import ProductThumbnail from '~/Components/ProductThumbnail'
import ProductListLoading from '~/Components/Products/ProductListLoading'
//data
import { productsApi } from '~/API/productsApi'

const Products = () => {
   const [filters, setFilters] = useState({
      category: [],
      sort: '',
      brand: [],
      active: false
   })
   const [loading, setLoading] = useState(true)
   const [products, setProducts] = useState([])

   const [page, setPage] = useState(1)
   const [order, setOrder] = useState('asc')
   const [totalPage, setTotalPage] = useState(6)

   /*handleFilterProducts => Filter => filterProductList*/

   const handleOrderChangeAsc = () => {
      setOrder('asc')
   }
   const handleOrderChangeDesc = () => {
      setOrder('desc')
   }
   const handleChangePage = (e, value) => {
      setPage(value)
   }
   const handleFilterProducts = (newFilters) => {
      setFilters(prev => ({ ...prev, ...newFilters }))
   }


   useEffect(() => {
      setPage(1)
   }, [filters])

   useEffect(() => {
      setFilters(
         prev => ({
            ...prev,
            active: false
         })
      )
   }, [filters.active])

   useEffect(() => {
      (async () => {
         try {
            const data = await productsApi.getAllInCategory({
               category: filters.category,
               page: page,
               limit: 9,
               sort: filters.sort,
               order: order,
               brand: filters.brand
            })
            console.log('page product', data)
            setProducts(data)

            setLoading(false)
         } catch (e) {
            alert(e.message)
         }
      })()
   }, [page, order, filters])

   useEffect(() => {
      (async () => {
         try {
            const totalProduct = products.length;
            totalProduct
               ? setTotalPage(Math.ceil(totalProduct / 9))
               : setTotalPage(1)

         } catch (e) {
            alert(e.message)
         }

      })()
   }, [products.length])


   return (
      <section className='my-20 md:my-28'>
         <div className='container px-4 md:px-8 mx-auto'>
            <div className='mb-8'>
               <h4 className='text-xl font-medium'>FOR YOU</h4>
               <p>
                  T???t c??? nh???ng s???n ph???m M???i nh???t n???m trong BST ???????c m??? b??n
                  H??ng Tu???n s??? ???????c c???p nh???t li??n t???c t???i ????y. Ch???c ch???n
                  b???n s??? t??m th???y nh???ng s???n ph???m ?????p Nh???t - V???a V???n Nh???t -
                  Ph?? H???p nh???t v???i phong c??ch c???a m??nh.
               </p>
            </div>
            <div className='flex gap-20'>
               <div className=''>
                  <ProductsFilter
                     filters={filters}
                     onChange={handleFilterProducts}
                  />
               </div>

               <div className='flex-1 '>
                  <div name='show' className='flex flex-col'>
                     <div
                        className='ml-auto flex gap-1'
                     >
                        <p
                           onClick={handleOrderChangeAsc}
                           className={`${false ? 'bg-black text-white' : 'bg-white text-black'} + inline text-sm font-medium px-4 py-1 border border-solid border-gray-500 hover:cursor-pointer hover:bg-black hover:text-white`}
                        >
                           Increase
                        </p>
                        <p
                           onClick={handleOrderChangeDesc}
                           className={`${false ? 'bg-black text-white' : 'bg-white text-black'} + inline text-sm font-medium px-4 py-1 border border-solid border-gray-500 hover:cursor-pointer hover:bg-black hover:text-white`}
                        >
                           Decrease
                        </p>
                     </div>
                     <div className='flex flex-wrap my-8 sm:-mx-2 md:-mx-2 lg:-mx-2.5'>
                        {loading ? (
                           <ProductListLoading />
                        ) : (
                           products.map((product) => (
                              <div
                                 key={product.productId}
                                 className="px-2 w-full sm:w-1/2 lg:w-1/3"
                              >
                                 <ProductThumbnail
                                    product={product}
                                 />
                              </div>
                           ))
                        )}
                     </div>
                     <div className='mx-auto'>
                        <Pagination
                           count={totalPage}
                           page={page}
                           onChange={handleChangePage}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Products
