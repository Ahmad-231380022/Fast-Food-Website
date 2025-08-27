import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [msg, setMsg] = useState('')
  useEffect(() => {
    api.get('/profile').then(res => setForm(res.data.user))
  }, [])
  async function save() {
    await api.put('/profile', form)
    setMsg('Saved!')
    setTimeout(()=>setMsg(''), 1500)
  }
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <div className="space-y-3">
        {(['name','email','phone','address'] as const).map((k)=> (
          <div key={k}>
            <label className="block text-sm mb-1 capitalize">{k}</label>
            <input value={(form as any)[k]||''} onChange={(e)=>setForm({...form, [k]: e.target.value})} className="w-full border rounded px-3 py-2" />
          </div>
        ))}
        <button onClick={save} className="bg-brand-red text-white px-4 py-2 rounded">Save</button>
        {msg && <div className="text-green-600 text-sm">{msg}</div>}
      </div>
    </div>
  )
}

