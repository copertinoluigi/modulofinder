'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '@/components/ui/Button'

export default function FinderPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filtri
  const [maxPrice, setMaxPrice] = useState(100000)
  const [minSqm, setMinSqm] = useState(0)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      let query = supabase.from('products').select('*')
      
      // Applica filtri
      if (maxPrice) query = query.lte('price', maxPrice)
      if (minSqm) query = query.gte('sqm', minSqm)

      const { data, error } = await query
      if (data) setProducts(data as Product[])
      setLoading(false)
    }
    fetchProducts()
  }, [maxPrice, minSqm])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 space-y-6 bg-white p-6 rounded-xl shadow-sm h-fit border">
        <h1 className="font-bold text-xl mb-4">Filtra Risultati</h1>
        
        <div>
          <label className="text-sm font-semibold">Budget Massimo: € {maxPrice.toLocaleString()}</label>
          <input 
            type="range" min="5000" max="150000" step="5000" 
            value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2 accent-yellow-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Metri Quadri Minimi</label>
          <select 
            className="w-full mt-2 p-2 border rounded bg-slate-50"
            onChange={e => setMinSqm(Number(e.target.value))}
          >
            <option value="0">Tutti</option>
            <option value="15">15+ m² (Ufficio/Camera)</option>
            <option value="30">30+ m² (Tiny House)</option>
            <option value="50">50+ m² (Bilocale)</option>
          </select>
        </div>
      </aside>

      {/* Grid */}
      <main className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-6">Case Disponibili ({products.length})</h2>
        
        {loading ? (
          <p>Caricamento in corso...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48 bg-gray-200">
                  <Image 
                    src={product.image_url} 
                    alt={product.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {product.is_prime && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">PRIME</span>
                  )}
                </div>
                <div className="p-4 flex flex-col h-[calc(100%-12rem)] justify-between">
                  <div>
                    <h3 className="font-bold text-sm line-clamp-2 mb-2" title={product.title}>{product.title}</h3>
                    <div className="text-xs text-slate-500 space-x-2 mb-3">
                      <span>📐 {product.sqm} m²</span>
                      <span>🚪 {product.rooms || '-'} Vani</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 mb-3">€ {product.price.toLocaleString()}</div>
                    <a 
                      href={product.amazon_link} 
                      target="_blank" 
                      rel="nofollow sponsored"
                      className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center font-bold py-2 rounded text-sm transition"
                    >
                      Vedi su Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
