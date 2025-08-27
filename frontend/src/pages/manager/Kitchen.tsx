import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function KitchenBoard() {
  const [orders, setOrders] = useState<any[]>([])
  async function load() {
    const { data } = await api.get('/orders', { params: { status: 'pending' } })
    setOrders(data.orders || [])
  }
  useEffect(()=>{ load(); const t = setInterval(load, 5000); return ()=> clearInterval(t) },[])
  async function approve(id: string) { await api.patch(`/orders/${id}/approve`); load() }
  async function ready(id: string) { await api.patch(`/orders/${id}/status`, { status: 'ready' }); load() }
  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-bold">Kitchen Orders</h1>
      {orders.map(o => (
        <div key={o._id} className="border rounded p-3 bg-white">
          <div className="flex items-center justify-between">
            <div className="font-medium">Order #{o._id.slice(-6)}</div>
            <div className="text-xs uppercase">{o.status}</div>
          </div>
          <ul className="list-disc pl-5 text-sm mt-2">
            {o.items.map((it: any) => (
              <li key={it.product}>{it.name} x{it.quantity}</li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3">
            <button onClick={()=>approve(o._id)} className="bg-brand-yellow px-3 py-1 rounded">Approve</button>
            <button onClick={()=>ready(o._id)} className="bg-green-600 text-white px-3 py-1 rounded">Mark Ready</button>
          </div>
        </div>
      ))}
      {orders.length === 0 && <div>No pending orders.</div>}
    </div>
  )
}

