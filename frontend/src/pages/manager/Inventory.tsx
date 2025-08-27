import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ api.get('/products/admin/low-stock').then(res => setItems(res.data.products || [])) },[])
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Low Stock</h1>
      <div className="space-y-2">
        {items.map(i => (
          <div key={i._id} className="border rounded p-3 flex items-center justify-between">
            <div>{i.name}</div>
            <div className="text-sm">Stock: {i.stock}</div>
          </div>
        ))}
        {items.length === 0 && <div>All good!</div>}
      </div>
    </div>
  )
}

