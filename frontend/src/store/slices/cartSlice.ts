import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  product: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.product === action.payload.product)
      if (existing) existing.quantity += action.payload.quantity
      else state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product !== action.payload)
    },
    changeQty(state, action: PayloadAction<{ product: string; quantity: number }>) {
      const item = state.items.find((i) => i.product === action.payload.product)
      if (item) item.quantity = action.payload.quantity
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, changeQty, clearCart } = cartSlice.actions
export default cartSlice.reducer

