'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function AdminPage() {
  const [form, setForm] = useState({ title: '', features: '', link: '', password: '' })
  const [status, setStatus] = useState('')

  const handleGenerate = async () => {
    setStatus('Generazione in corso (10-20 sec)... 🤖')
    
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': form.password // Passiamo la password nell'header
        },
        body: JSON.stringify({
          productTitle: form.title,
          features: form.features,
          amazonLink: form.link
        })
      })

      const data = await res.json()
      
      if (res.ok && data.success) {
        setStatus('✅ Articolo Creato e Pubblicato!')
        setForm(prev => ({ ...prev, title: '', features: '' }))
      } else {
        setStatus(`❌ Errore: ${data.error || 'Sconosciuto'}`)
      }
    } catch (e) {
      setStatus('❌ Errore di rete')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-white p-6 rounded-xl shadow border space-y-4">
        <div>
          <label className="text-sm font-bold">Password Admin</label>
          <input 
            type="password" 
            className="w-full border p-2 rounded" 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
        </div>
        <hr />
        <div>
          <label className="text-sm font-bold">Nome Prodotto Amazon</label>
          <input 
            className="w-full border p-2 rounded" 
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-bold">Link Affiliato</label>
          <input 
            className="w-full border p-2 rounded" 
            value={form.link}
            onChange={e => setForm({...form, link: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-bold">Dettagli (Copia da Amazon)</label>
          <textarea 
            className="w-full border p-2 rounded h-32" 
            value={form.features}
            onChange={e => setForm({...form, features: e.target.value})}
          />
        </div>
        
        <Button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700">
          Genera Recensione AI
        </Button>
        
        {status && <p className="text-center font-mono text-sm font-bold">{status}</p>}
      </div>
    </div>
  )
}
