import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../src/store'
import { clearCart } from '../../../src/store/slices/cartSlice'
import { createOrder } from '../../../src/store/slices/ordersSlice'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { items } = useSelector((s: RootState) => s.cart)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const total = items.reduce((n, i) => n + i.price * i.quantity, 0)

  async function handlePlaceOrder() {
    const payload = { items: items.map(i => ({ product: i.product, name: i.name, price: i.price, quantity: i.quantity })) }
    await dispatch(createOrder(payload as any))
    dispatch(clearCart())
    navigate('/orders')
  }

  if (items.length === 0) return <div className="p-4">Cart is empty.</div>
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <div className="bg-white border rounded p-4">
        <div className="mb-3">Items: {items.length}</div>
        <div className="font-bold mb-4">Total: ${total.toFixed(2)}</div>
        <button onClick={handlePlaceOrder} className="bg-brand-red text-white px-4 py-2 rounded">Place Order (COD)</button>
      </div>
    </div>
  )
}

