import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import '../../lib/chartSetup'
import { api } from '../../../src/lib/axios'

export default function ManagerCharts() {
  const [labels, setLabels] = useState<string[]>([])
  const [revenues, setRevenues] = useState<number[]>([])
  const [orders, setOrders] = useState<number[]>([])
  useEffect(()=>{
    api.get('/reports/sales').then(res => {
      const data = res.data.data || []
      setLabels(data.map((d: any)=> d.date))
      setRevenues(data.map((d: any)=> d.revenue || 0))
      setOrders(data.map((d: any)=> d.orders || 0))
    })
  },[])
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Sales Charts</h1>
      <div className="bg-white rounded shadow p-4">
        <Line data={{ labels, datasets: [{ label: 'Revenue', data: revenues, borderColor: '#D9251D', backgroundColor: 'rgba(217,37,29,0.2)' }] }} />
      </div>
      <div className="bg-white rounded shadow p-4">
        <Line data={{ labels, datasets: [{ label: 'Orders', data: orders, borderColor: '#FFC72C', backgroundColor: 'rgba(255,199,44,0.2)' }] }} />
      </div>
    </div>
  )
}

