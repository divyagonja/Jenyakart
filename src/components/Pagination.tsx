
import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setCurrentPage } from '../store/slices/productsSlice'
import { Button } from './ui/button'

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch()
  const { filteredProducts, currentPage, productsPerPage } = useAppSelector((state) => state.products)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length)

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <div className="text-sm text-gray-600">
        Showing {startIndex + 1}-{endIndex} of {filteredProducts.length} products
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="hover:bg-blue-50 transition-colors duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <Button
                onClick={() => handlePageChange(page as number)}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                className={`min-w-[40px] transition-all duration-300 ${
                  currentPage === page 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="hover:bg-blue-50 transition-colors duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
