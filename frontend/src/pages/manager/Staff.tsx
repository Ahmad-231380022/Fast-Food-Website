import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function StaffManagement() {
  const [staff, setStaff] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  useEffect(()=>{ api.get('/staff').then(res => setStaff(res.data.users || [])) },[])
  async function create() {
    const { data } = await api.post('/staff', form)
    setStaff([data.user, ...staff])
    setForm({ name: '', email: '', password: '' })
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Staff Management</h1>
      <div className="flex gap-2 max-w-xl">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="border rounded px-2 py-1" />
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="border rounded px-2 py-1" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} className="border rounded px-2 py-1" />
        <button onClick={create} className="bg-brand-red text-white px-3 py-1 rounded">Add</button>
      </div>
      <div className="space-y-2">
        {staff.map(s => (
          <div key={s.id || s._id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-600">{s.email}</div>
            </div>
            <div className="text-xs uppercase bg-gray-100 px-2 py-1 rounded">{s.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

