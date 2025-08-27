import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CustomerHome from './pages/customer/Home'
import CashierDashboard from './pages/cashier/Dashboard'
import ManagerDashboard from './pages/manager/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import { useAuthGuard } from './hooks/useAuthGuard'
import Layout from './components/Layout'
import CartPage from './pages/customer/Cart'
import CheckoutPage from './pages/customer/Checkout'
import OrdersPage from './pages/customer/Orders'
import ProfilePage from './pages/customer/Profile'
import WishlistPage from './pages/customer/Wishlist'
import SupportPage from './pages/customer/Support'
import PosPage from './pages/cashier/Pos'
import MenuManagement from './pages/manager/Menu'
import StaffManagement from './pages/manager/Staff'
import InventoryPage from './pages/manager/Inventory'
import ReportsPage from './pages/manager/Reports'
import ManagerCharts from './pages/manager/Charts'
import KitchenBoard from './pages/manager/Kitchen'
import UsersAdmin from './pages/admin/Users'
import SettingsPage from './pages/admin/Settings'

function ProtectedRoute({ children, roles }: { children: React.ReactElement; roles?: Array<'customer' | 'cashier' | 'manager' | 'admin'> }) {
  useAuthGuard(roles)
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout><CustomerHome /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/checkout" element={<ProtectedRoute roles={["customer","cashier","manager","admin"]}><Layout><CheckoutPage /></Layout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute roles={["customer","cashier","manager","admin"]}><Layout><OrdersPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute roles={["customer","cashier","manager","admin"]}><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute roles={["customer","cashier","manager","admin"]}><Layout><WishlistPage /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute roles={["customer","cashier","manager","admin"]}><Layout><SupportPage /></Layout></ProtectedRoute>} />
        <Route path="/cashier" element={<ProtectedRoute roles={["cashier", "manager", "admin"]}><CashierDashboard /></ProtectedRoute>} />
        <Route path="/cashier/pos" element={<ProtectedRoute roles={["cashier", "manager", "admin"]}><PosPage /></ProtectedRoute>} />
        <Route path="/manager" element={<ProtectedRoute roles={["manager", "admin"]}><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/manager/menu" element={<ProtectedRoute roles={["manager", "admin"]}><MenuManagement /></ProtectedRoute>} />
        <Route path="/manager/staff" element={<ProtectedRoute roles={["manager", "admin"]}><StaffManagement /></ProtectedRoute>} />
        <Route path="/manager/inventory" element={<ProtectedRoute roles={["manager", "admin"]}><InventoryPage /></ProtectedRoute>} />
        <Route path="/manager/reports" element={<ProtectedRoute roles={["manager", "admin"]}><ReportsPage /></ProtectedRoute>} />
        <Route path="/manager/charts" element={<ProtectedRoute roles={["manager", "admin"]}><ManagerCharts /></ProtectedRoute>} />
        <Route path="/manager/kitchen" element={<ProtectedRoute roles={["manager", "admin"]}><KitchenBoard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><UsersAdmin /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute roles={["admin"]}><SettingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
