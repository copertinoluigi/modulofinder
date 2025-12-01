'use client'
import { useState } from 'react'

export default function Admin() {
  const [form, setForm] = useState({ title: '', features: '', link: '' })
  const [status, setStatus] = useState('')

  const handleGenerate = async () => {
    setStatus('L\'AI sta pensando... 🤖')
    const res = await fetch('/api/generate-post', {
      method: 'POST',
      body: JSON.stringify({ 
        productTitle: form.title, 
        features: form.features, 
        amazonLink: form.link 
      })
    })
    const data = await res.json()
    if(data.success) setStatus('✅ Articolo Pubblicato!')
    else setStatus('❌ Errore.')
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Admin ModuloFinder</h1>
      <div className="flex flex-col gap-4">
        <input placeholder="Nome Prodotto" className="border p-2" 
          onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Link Amazon" className="border p-2" 
          onChange={e => setForm({...form, link: e.target.value})} />
        <textarea placeholder="Caratteristiche (copia da Amazon)" className="border p-2 h-32" 
          onChange={e => setForm({...form, features: e.target.value})} />
        <button onClick={handleGenerate} className="bg-black text-white p-3 rounded">
          Genera Recensione con AI
        </button>
        <p>{status}</p>
      </div>
    </div>
  )
}
