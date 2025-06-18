
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { clearCart, setCheckingOut, setOrderSuccess } from '../store/slices/cartSlice'
import { formatPrice, calculateDiscountedPrice } from '../utils/currency'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useToast } from '../hooks/use-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, total, isCheckingOut, orderSuccess } = useAppSelector((state) => state.cart)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim())
    
    if (missingFields.length > 0) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to complete your order.",
        variant: "destructive",
      })
      return
    }

    dispatch(setCheckingOut(true))
    
    // Simulate order processing
    setTimeout(() => {
      dispatch(setCheckingOut(false))
      dispatch(setOrderSuccess(true))
      
      // Clear cart after successful order
      setTimeout(() => {
        dispatch(clearCart())
      }, 3000)
    }, 2000)
  }

  const handleBackToShopping = () => {
    dispatch(setOrderSuccess(false))
    navigate('/')
  }

  if (items.length === 0 && !orderSuccess) {
    navigate('/cart')
    return null
  }

  // Order Success Modal
  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleBackToShopping}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => dispatch(setOrderSuccess(false))}
              variant="outline"
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Close
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
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Complete your order</p>
          </div>
          <Button
            onClick={() => navigate('/cart')}
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Free Shipping</div>
                      <div className="text-sm text-gray-600">On all orders</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Secure Payment</div>
                      <div className="text-sm text-gray-600">SSL encrypted</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Easy Returns</div>
                      <div className="text-sm text-gray-600">30-day policy</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:opacity-50 mt-6"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Place Order - {formatPrice(total)}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const discountedPrice = calculateDiscountedPrice(item.price, item.discountPercentage)
                return (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{item.title}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      {formatPrice(discountedPrice * item.quantity)}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
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
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
