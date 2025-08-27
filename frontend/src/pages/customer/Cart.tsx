import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../src/store'
import { changeQty, removeItem } from '../../../src/store/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { items } = useSelector((s: RootState) => s.cart)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const total = items.reduce((n, i) => n + i.price * i.quantity, 0)
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>Cart is empty. <Link to="/" className="text-brand-red">Go shopping</Link></div>
      ) : (
        <div className="space-y-3">
          {items.map(it => (
            <div key={it.product} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">${it.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min={1} value={it.quantity} onChange={(e)=>dispatch(changeQty({ product: it.product, quantity: Number(e.target.value) }))} className="w-16 border rounded px-2 py-1" />
                <button onClick={()=>dispatch(removeItem(it.product))} className="text-sm text-red-600">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="font-bold">Total: ${total.toFixed(2)}</div>
            <button onClick={()=>navigate('/checkout')} className="bg-brand-yellow px-4 py-2 rounded">Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

