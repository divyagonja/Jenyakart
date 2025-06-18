
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import { formatPrice, calculateDiscountedPrice } from '../utils/currency'
import { Button } from '../components/ui/button'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, total, itemCount } = useAppSelector((state) => state.cart)

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{itemCount} items in your cart</p>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => {
                  const discountedPrice = calculateDiscountedPrice(item.price, item.discountPercentage)
                  return (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-bold text-gray-900">
                              {formatPrice(discountedPrice)}
                            </span>
                            {item.discountPercentage > 0 && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                variant="outline"
                                size="sm"
                                className="w-8 h-8 p-0 hover:bg-red-50 hover:border-red-300 transition-colors duration-300"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                variant="outline"
                                size="sm"
                                className="w-8 h-8 p-0 hover:bg-green-50 hover:border-green-300 transition-colors duration-300"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <Button
                              onClick={() => handleRemoveItem(item.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg text-gray-900">
                            {formatPrice(discountedPrice * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Secure checkout powered by industry-leading encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
