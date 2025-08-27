import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function SettingsPage() {
  const [form, setForm] = useState({ taxPercent: 0, deliveryCharge: 0 })
  const [saved, setSaved] = useState(false)
  useEffect(()=>{ api.get('/settings').then(res=> setForm({ taxPercent: res.data.settings.taxPercent || 0, deliveryCharge: res.data.settings.deliveryCharge || 0 })) },[])
  async function save() { await api.put('/settings', form); setSaved(true); setTimeout(()=>setSaved(false), 1200) }
  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-bold mb-3">Settings</h1>
      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Tax Percent</label>
          <input type="number" value={form.taxPercent} onChange={(e)=>setForm({...form, taxPercent: Number(e.target.value)})} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm mb-1">Delivery Charge</label>
          <input type="number" value={form.deliveryCharge} onChange={(e)=>setForm({...form, deliveryCharge: Number(e.target.value)})} className="border rounded px-2 py-1" />
        </div>
        <button onClick={save} className="bg-brand-red text-white px-3 py-2 rounded">Save</button>
        {saved && <div className="text-green-600 text-sm">Saved!</div>}
      </div>
    </div>
  )
}

