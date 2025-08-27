import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export default function Layout({ children }: { children: React.ReactNode }) {
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((n, i) => n + i.quantity, 0))
  const user = useSelector((s: RootState) => s.user.user)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-red text-white px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">FastFoodHouse</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:underline">Menu</Link>
          <Link to="/cart" className="hover:underline">Cart ({cartCount})</Link>
          {user ? (
            <>
              <Link to="/orders" className="hover:underline">Orders</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <Link to="/support" className="hover:underline">Support</Link>
            </>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 text-center text-xs py-3">© {new Date().getFullYear()} FastFoodHouse</footer>
    </div>
  )
}

