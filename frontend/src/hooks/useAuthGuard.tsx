import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { fetchMe } from '../store/slices/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export function useAuthGuard(requiredRoles?: Array<'customer' | 'cashier' | 'manager' | 'admin'>) {
  const { user, token } = useSelector((s: RootState) => s.user)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchMe())
    }
  }, [user, token, dispatch])

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true, state: { from: location.pathname } })
      return
    }
    if (requiredRoles && user && !requiredRoles.includes(user.role)) {
      const fallback = user.role === 'admin' ? '/admin' : user.role === 'manager' ? '/manager' : user.role === 'cashier' ? '/cashier' : '/'
      navigate(fallback, { replace: true })
    }
  }, [user, token, requiredRoles, navigate, location.pathname])
}

