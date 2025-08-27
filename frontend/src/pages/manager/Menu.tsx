import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function MenuManagement() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', category: '', price: 0, stock: 0 })
  useEffect(()=>{ api.get('/products').then(res=> setItems(res.data.products || [])) },[])
  async function create() {
    const { data } = await api.post('/products', form)
    setItems([data.product, ...items])
    setForm({ name: '', category: '', price: 0, stock: 0 })
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Menu Management</h1>
      <div className="grid grid-cols-2 gap-2 max-w-2xl">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="border rounded px-2 py-1" />
        <input placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="border rounded px-2 py-1" />
        <input type="number" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} className="border rounded px-2 py-1" />
        <input type="number" placeholder="Stock" value={form.stock} onChange={(e)=>setForm({...form, stock: Number(e.target.value)})} className="border rounded px-2 py-1" />
        <button onClick={create} className="bg-brand-red text-white px-3 py-2 rounded col-span-2">Add Item</button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {items.map(i => (
          <div key={i._id} className="border rounded p-3">
            <div className="font-medium">{i.name}</div>
            <div className="text-sm text-gray-600">{i.category}</div>
            <div className="flex items-center justify-between mt-2">
              <div>${i.price.toFixed(2)}</div>
              <div className="text-sm">Stock: {i.stock}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

