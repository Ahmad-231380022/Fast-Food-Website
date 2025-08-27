import { useEffect, useState } from 'react'
import { api } from '../../../src/lib/axios'

interface Product { _id: string; name: string; price: number }

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([])
  useEffect(() => { api.get('/wishlist').then(res => setWishlist(res.data.wishlist || [])) }, [])
  async function remove(id: string) {
    await api.delete(`/wishlist/${id}`)
    setWishlist(wishlist.filter(w => w._id !== id))
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Wishlist</h1>
      <div className="space-y-3">
        {wishlist.map(p => (
          <div key={p._id} className="border p-3 rounded flex items-center justify-between">
            <div>{p.name}</div>
            <div className="flex items-center gap-3">
              <div className="font-semibold">${p.price.toFixed(2)}</div>
              <button onClick={()=>remove(p._id)} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        ))}
        {wishlist.length === 0 && <div>No items yet.</div>}
      </div>
    </div>
  )
}

