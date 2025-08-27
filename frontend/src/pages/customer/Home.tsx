import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../src/store'
import { addItem } from '../../../src/store/slices/cartSlice'

interface Product { _id: string; name: string; price: number; category: string; description?: string }

export default function CustomerHome() {
  const [products, setProducts] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    api.get('/products', { params: { q } }).then((res) => setProducts(res.data.products))
  }, [q])

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-brand-red text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FastFoodHouse</h1>
        <input placeholder="Search menu..." value={q} onChange={(e)=>setQ(e.target.value)} className="rounded px-3 py-1 text-black" />
      </header>
      <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg">{p.name}</div>
            <div className="text-sm text-gray-600 mb-2">{p.category}</div>
            {p.description && <p className="text-sm mb-3">{p.description}</p>}
            <div className="flex items-center justify-between">
              <span className="text-brand-red font-bold">${p.price.toFixed(2)}</span>
              <button onClick={()=>dispatch(addItem({ product: p._id, name: p.name, price: p.price, quantity: 1 }))} className="bg-brand-yellow text-black px-3 py-1 rounded">Add</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}