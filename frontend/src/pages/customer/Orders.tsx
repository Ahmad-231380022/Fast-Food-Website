import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders } from '../../../src/store/slices/ordersSlice'
import type { RootState, AppDispatch } from '../../../src/store'

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { list, status } = useSelector((s: RootState) => s.orders)
  useEffect(() => { dispatch(fetchMyOrders()) }, [dispatch])
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {status === 'loading' ? 'Loading...' : (
        <div className="space-y-3">
          {list.map(o => (
            <div key={o._id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                <div className="font-medium">{o.status.toUpperCase()}</div>
              </div>
              <div className="font-bold">${o.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

