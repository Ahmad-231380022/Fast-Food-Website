import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../src/store'
import { login } from '../../../src/store/slices/userSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const status = useSelector((s: RootState) => s.user.status)
  useSelector((s: RootState) => s.user.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await dispatch(login({ email, password }))
      if ((res as any).error) throw new Error('Login failed')
      const role = (res as any).payload.user.role as 'customer' | 'cashier' | 'manager' | 'admin'
      const redirect = role === 'admin' ? '/admin' : role === 'manager' ? '/manager' : role === 'cashier' ? '/cashier' : '/'
      navigate(redirect, { replace: true })
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-brand-red mb-6 text-center">FastFoodHouse Login</h1>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow" required />
          </div>
          <button type="submit" disabled={status==='loading'} className="w-full bg-brand-red text-white py-2 rounded hover:bg-red-700 transition">
            {status==='loading' ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">No account? <Link to="/register" className="text-brand-red font-medium">Register</Link></p>
      </div>
    </div>
  )
}