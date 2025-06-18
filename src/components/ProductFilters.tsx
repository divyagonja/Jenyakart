
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setSelectedCategory } from '../store/slices/productsSlice'
import { Button } from './ui/button'

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch()
  const { categories, selectedCategory } = useAppSelector((state) => state.products)

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category))
  }

  const formatCategoryName = (category: string) => {
    if (typeof category !== 'string') return 'Unknown'
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleCategoryChange('all')}
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          className={`transition-all duration-300 ${
            selectedCategory === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            className={`transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {formatCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ProductFilters
