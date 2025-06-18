
import React from 'react'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Product } from '../store/slices/productsSlice'
import { useAppDispatch } from '../hooks/redux'
import { addToCart } from '../store/slices/cartSlice'
import { formatPrice, calculateDiscountedPrice } from '../utils/currency'
import { Button } from './ui/button'
import { useToast } from '../hooks/use-toast'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-blue-200">
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {product.stock} in stock
          </span>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
