
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from './productsSlice'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
  discountPercentage: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isCheckingOut: boolean
  orderSuccess: boolean
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  total: 0,
  itemCount: 0,
  isCheckingOut: false,
  orderSuccess: false,
}

// Calculate totals from items
const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((total, item) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100)
    return total + (discountedPrice * item.quantity)
  }, 0)
  return { itemCount, total }
}

// Initialize state with calculated totals
const { itemCount, total } = calculateTotals(initialState.items)
initialState.itemCount = itemCount
initialState.total = total

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
          thumbnail: action.payload.thumbnail,
          discountPercentage: action.payload.discountPercentage,
        })
      }
      
      const totals = calculateTotals(state.items)
      state.itemCount = totals.itemCount
      state.total = totals.total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      
      const totals = calculateTotals(state.items)
      state.itemCount = totals.itemCount
      state.total = totals.total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id)
        }
      }
      
      const totals = calculateTotals(state.items)
      state.itemCount = totals.itemCount
      state.total = totals.total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
      localStorage.removeItem('cartItems')
    },
    setCheckingOut: (state, action: PayloadAction<boolean>) => {
      state.isCheckingOut = action.payload
    },
    setOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.orderSuccess = action.payload
    },
  },
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  setCheckingOut, 
  setOrderSuccess 
} = cartSlice.actions
export default cartSlice.reducer
