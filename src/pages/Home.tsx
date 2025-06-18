
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchProducts, fetchCategories } from '../store/slices/productsSlice'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import Pagination from '../components/Pagination'
import { Loader2, ShoppingBag, TrendingUp, Users, Star } from 'lucide-react'

const Home = () => {
  const dispatch = useAppDispatch()
  const { 
    filteredProducts, 
    currentPage, 
    productsPerPage, 
    isLoading, 
    error,
    searchQuery 
  } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  // Get current products for pagination
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Shop the latest trends with unbeatable prices and premium quality
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ShoppingBag className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-blue-200">Products</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-blue-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <ProductFilters />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No products match your search for "${searchQuery}"`
                : 'No products available in this category'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
