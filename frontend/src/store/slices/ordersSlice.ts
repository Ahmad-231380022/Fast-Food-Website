import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../lib/axios'

export interface OrderItem { product: string; name: string; price: number; quantity: number; subtotal?: number }
export interface Order {
  _id: string
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total: number
  createdAt: string
}

interface OrdersState {
  list: Order[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: OrdersState = { list: [], status: 'idle' }

export const fetchMyOrders = createAsyncThunk('orders/mine', async () => {
  const { data } = await api.get('/orders?mine=1')
  return data.orders as Order[]
})

export const createOrder = createAsyncThunk('orders/create', async (payload: { items: OrderItem[]; paymentMethod?: 'cod' | 'card' }) => {
  const { data } = await api.post('/orders', payload)
  return data.order as Order
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => { state.status = 'loading' })
      .addCase(fetchMyOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = 'idle'
        state.list = action.payload
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.list.unshift(action.payload)
      })
  }
})

export default ordersSlice.reducer

