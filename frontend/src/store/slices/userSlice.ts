import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../lib/axios'

export type Role = 'customer' | 'cashier' | 'manager' | 'admin'

export interface UserInfo {
  id: string
  name: string
  email: string
  role: Role
}

interface UserState {
  user: UserInfo | null
  token: string | null
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'),
  status: 'idle',
}

export const login = createAsyncThunk(
  'user/login',
  async (payload: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', payload)
    return data as { user: UserInfo; token: string }
  }
)

export const fetchMe = createAsyncThunk('user/me', async () => {
  const { data } = await api.get('/auth/me')
  return data.user as UserInfo
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: UserInfo; token: string }>) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.user = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer

