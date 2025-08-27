import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function AdminDashboard() {
  const [users, setUsers] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [orders, setOrders] = useState(0)
  useEffect(() => {
    api.get('/users').then((res) => setUsers((res.data.users || []).length)).catch(()=>{})
    api.get('/reports/sales').then((res) => {
      const data = res.data.data || []
      setRevenue(data.reduce((n: number, d: any) => n + (d.revenue || 0), 0))
      setOrders(data.reduce((n: number, d: any) => n + (d.orders || 0), 0))
    })
  }, [])
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-600">Total Users</div>
          <div className="text-3xl font-bold">{users}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-600">Revenue</div>
          <div className="text-3xl font-bold">${revenue.toFixed(2)}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-600">Orders</div>
          <div className="text-3xl font-bold">{orders}</div>
        </div>
      </div>
    </div>
  )
}
