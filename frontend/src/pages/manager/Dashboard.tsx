import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'
import { Link } from 'react-router-dom'

export default function ManagerDashboard() {
  const [revenue, setRevenue] = useState(0)
  useEffect(() => {
    api.get('/reports/sales').then((res) => {
      const sum = (res.data.data || []).reduce((acc: number, r: any) => acc + (r.revenue || 0), 0)
      setRevenue(sum)
    })
  }, [])
  return (
    <div className="min-h-screen p-6 bg-gray-50 space-y-4">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-gray-600">Revenue (range)</div>
          <div className="text-3xl font-bold">${revenue.toFixed(2)}</div>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to="/manager/menu" className="bg-brand-red text-white px-3 py-2 rounded">Menu</Link>
        <Link to="/manager/staff" className="bg-brand-yellow text-black px-3 py-2 rounded">Staff</Link>
        <Link to="/manager/inventory" className="bg-gray-200 px-3 py-2 rounded">Inventory</Link>
        <Link to="/manager/reports" className="bg-gray-200 px-3 py-2 rounded">Reports</Link>
        <Link to="/manager/charts" className="bg-gray-200 px-3 py-2 rounded">Charts</Link>
        <Link to="/manager/kitchen" className="bg-gray-200 px-3 py-2 rounded">Kitchen</Link>
      </div>
    </div>
  )
}