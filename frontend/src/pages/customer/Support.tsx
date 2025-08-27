import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  async function load() { const { data } = await api.get('/support/mine'); setTickets(data.tickets || []) }
  useEffect(()=>{ load() },[])
  async function submit() {
    await api.post('/support', { subject, message })
    setSubject(''); setMessage('');
    load()
  }
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Support</h1>
      <div className="space-y-2 border rounded p-3">
        <input placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} className="border rounded px-2 py-1 w-full" />
        <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} className="border rounded px-2 py-1 w-full h-28" />
        <button onClick={submit} className="bg-brand-red text-white px-3 py-2 rounded">Submit</button>
      </div>
      <div className="space-y-2">
        {tickets.map(t => (
          <div key={t._id} className="border rounded p-3">
            <div className="font-medium">{t.subject}</div>
            <div className="text-sm text-gray-600">{t.status}</div>
            <p className="text-sm mt-1">{t.message}</p>
          </div>
        ))}
        {tickets.length === 0 && <div>No tickets yet.</div>}
      </div>
    </div>
  )
}

