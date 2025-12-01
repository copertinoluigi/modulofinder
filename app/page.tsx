'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [budget, setBudget] = useState(50000)

  useEffect(() => {
    async function fetchProducts() {
      // Prende i prodotti che costano meno del budget
      const { data } = await supabase
        .from('products')
        .select('*')
        .lte('price', budget)
      
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [budget])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto font-bold text-xl">ModuloFinder 🏠</div>
      </header>

      <main className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-6">
        {/* Sidebar Filtri */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded shadow h-fit">
          <h2 className="font-bold mb-4">Filtra per Budget</h2>
          <label>Max: € {budget.toLocaleString()}</label>
          <input type="range" min="5000" max="100000" step="1000" 
            value={budget} onChange={e => setBudget(Number(e.target.value))} 
            className="w-full mt-2" />
        </aside>

        {/* Griglia Prodotti */}
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-6">Case Modulari Trovate: {products.length}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded border overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative h-48 w-full bg-gray-200">
                  {/* Usa un placeholder se l'immagine non carica */}
                  <Image src={p.image_url} alt={p.title} fill className="object-cover"/>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-green-600 font-bold text-xl mt-2">€ {p.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-4">
                    <a href={p.amazon_link} target="_blank" className="flex-1 bg-yellow-400 text-center py-2 rounded font-bold text-sm">
                      Vedi su Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && <p>Nessuna casa trovata sotto questo prezzo.</p>}
          </div>
        </div>
      </main>
    </div>
  )
}
