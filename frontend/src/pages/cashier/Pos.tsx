import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

interface Product { _id: string; name: string; price: number }
interface PosItem { product: string; name: string; price: number; quantity: number }

export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [items, setItems] = useState<PosItem[]>([])
  const total = items.reduce((n, i) => n + i.price * i.quantity, 0)

  useEffect(() => { api.get('/products').then(res => setProducts(res.data.products || [])) }, [])

  function add(p: Product) {
    setItems(prev => {
      const existed = prev.find(i => i.product === p._id)
      if (existed) return prev.map(i => i.product === p._id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { product: p._id, name: p.name, price: p.price, quantity: 1 }]
    })
  }

  async function placeOrder() {
    await api.post('/orders', { items, walkIn: true, paymentMethod: 'cod' })
    setItems([])
    alert('Order placed')
  }

  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
        {products.map(p => (
          <button key={p._id} onClick={()=>add(p)} className="border p-3 rounded text-left hover:bg-gray-50">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
          </button>
        ))}
      </div>
      <div className="bg-white border rounded p-3">
        <h2 className="font-bold mb-2">Current Order</h2>
        <div className="space-y-2 max-h-96 overflow-auto">
          {items.map(i => (
            <div key={i.product} className="flex items-center justify-between">
              <div>{i.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm">x{i.quantity}</span>
                <span className="font-medium">${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t mt-3 pt-2">
          <div className="font-bold">Total</div>
          <div className="font-bold">${total.toFixed(2)}</div>
        </div>
        <button onClick={placeOrder} className="w-full mt-3 bg-brand-yellow px-3 py-2 rounded">Place Order (COD)</button>
      </div>
    </div>
  )
}

