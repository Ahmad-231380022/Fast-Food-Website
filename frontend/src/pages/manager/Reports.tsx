import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function ReportsPage() {
  const [data, setData] = useState<{ date: string; orders: number; revenue: number }[]>([])
  useEffect(()=>{ api.get('/reports/sales').then(res=> setData(res.data.data || [])) },[])
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sales (JSON)</h1>
      <div className="overflow-auto">
        <table className="min-w-[400px] text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Orders</th>
              <th className="p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.date} className="border-b">
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.orders}</td>
                <td className="p-2">${r.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-2">
        <a href={`${import.meta.env.VITE_API_URL}/reports/sales.pdf`} className="bg-brand-red text-white px-3 py-2 rounded">Export PDF</a>
        <a href={`${import.meta.env.VITE_API_URL}/reports/sales.xlsx`} className="bg-brand-yellow text-black px-3 py-2 rounded">Export XLSX</a>
      </div>
    </div>
  )
}

