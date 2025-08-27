import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function CashierDashboard() {
  const [ordersToday, setOrdersToday] = useState(0)
  useEffect(() => {
    api.get('/orders').then((res) => setOrdersToday((res.data.orders || []).length))
  }, [])
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Cashier POS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-600">Orders (all)</div>
          <div className="text-3xl font-bold">{ordersToday}</div>
        </div>
      </div>
    </div>
  )
}