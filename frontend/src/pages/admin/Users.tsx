import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([])
  useEffect(()=>{ api.get('/users').then(res => setUsers(res.data.users || [])) },[])
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Users</h1>
      <div className="space-y-2">
        {users.map(u => (
          <div key={u._id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </div>
            <div className="text-xs uppercase bg-gray-100 px-2 py-1 rounded">{u.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

