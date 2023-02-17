import React from 'react'
import BrandFilter from '../Features/Filter/BrandFilter'
import CategoryFilter from '../Features/Filter/CategoryFilter'
import ColorFilter from '../Features/Filter/ColorFilter'
import SizeFilter from '../Features/Filter/SizeFilter'

const ProductsFilter = ({ filters, onChange, products }) => {

    const handleFilterCategory = (newCategory) => {
        if (!onChange) return;

        const newFilters = {
            ...filters,
            category: newCategory,
        }
        onChange(newFilters)
    }

    const handleFilterBrand = (newBrand) => {
        if (!onChange) return;

        const newFilters = {
            ...filters,
            brand: newBrand,
        }
        onChange(newFilters)
    }

    // const handleSizeFilter = (newSizes) => {
    //     if (!onChange) return;

    //     const newFilters = {
    //         ...filters,
    //         sizes: newSizes,
    //         active: true
    //     }
    //     onChange(newFilters)
    // }

    // const handleColorFilter = (newColors) => {
    //     if (!onChange) return;

    //     const newFilters = {
    //         ...filters,
    //         colors: newColors,
    //         active: true
    //     }
    //     onChange(newFilters)
    // }

    const handleResetFilter = () => {
        if (!onChange) return;

        const initialFilters = {
            category: [],
            brand: [],
            active: true
        }
        onChange(initialFilters)
    }

    return (
        <div>
            <CategoryFilter
                filters={filters}
                onChange={handleFilterCategory}
            />
            <BrandFilter
                filters={filters}
                onChange={handleFilterBrand}
            />
            {/* <SizeFilter
                filters={filters}
                onChange={handleSizeFilter}
            />
            <ColorFilter
                filters={filters}
                onChange={handleColorFilter}
            /> */}

            <div
                className='inline-block text-sm font-medium text-white mt-5 px-4 py-1.5 border border-solid border-gray-500 bg-black hover:cursor-pointer hover:text-black hover:bg-white'
                onClick={handleResetFilter}
            >
                RESET
            </div>
        </div>
    )
}

export default ProductsFilter
