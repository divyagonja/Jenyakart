
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  selectedCategory: string
  currentPage: number
  productsPerPage: number
  isLoading: boolean
  error: string | null
  searchQuery: string
  total: number
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  currentPage: 1,
  productsPerPage: 12,
  isLoading: false,
  error: null,
  searchQuery: '',
  total: 0,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to fetch products')
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products/category-list')
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to fetch categories')
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
      state.filteredProducts = action.payload === 'all' 
        ? state.products 
        : state.products.filter(product => product.category === action.payload)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      
      let filtered = state.selectedCategory === 'all' 
        ? state.products 
        : state.products.filter(product => product.category === state.selectedCategory)
      
      if (action.payload) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.brand.toLowerCase().includes(action.payload.toLowerCase())
        )
      }
      
      state.filteredProducts = filtered
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.filteredProducts = action.payload.products
        state.total = action.payload.total
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setSelectedCategory, setCurrentPage, setSearchQuery } = productsSlice.actions
export default productsSlice.reducer
