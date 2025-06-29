
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  isRegistering: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isRegistering: false,
}

export interface RegisterUserParams {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterUserParams, { rejectWithValue }) => {
    try {
      // For demo purposes, simulate registration
      // In a real app, this would be an API call to register the user
      
      // Simulate a delay for the registration process
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a mock user with the provided data
      const mockUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: 'not specified', // Default value
        image: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=random`,
        accessToken: 'mock-jwt-token-' + Date.now()
      }
      
      // Store token in localStorage
      localStorage.setItem('accessToken', mockUser.accessToken)
      
      return mockUser
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.')
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      // For demo purposes, simulate login with test credentials
      if (credentials.username === 'test' && credentials.password === 'test') {
        const mockUser = {
          id: 1,
          username: 'test',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          gender: 'male',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          accessToken: 'mock-jwt-token-' + Date.now()
        }
        
        // Store token in localStorage
        localStorage.setItem('accessToken', mockUser.accessToken)
        
        return mockUser
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return rejectWithValue('Invalid username or password. Please use test/test.')
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const token = state.auth.accessToken

      if (!token) {
        throw new Error('No token available')
      }

      // Return mock user data for demo
      const mockUser = {
        id: 1,
        username: 'test',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      
      return mockUser
    } catch (error) {
      return rejectWithValue('Failed to get user information')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('accessToken')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isRegistering = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isRegistering = false
        state.user = action.payload
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isRegistering = false
        state.error = action.payload as string
      })
      // Get current user case
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
