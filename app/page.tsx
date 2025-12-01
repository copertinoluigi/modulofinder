import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Home, ShieldCheck, Truck } from 'lucide-react'

export default function Homepage() {
  return (
    <div className="space-y-20">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            La tua Casa Modulare, <br/>
            <span className="text-yellow-400">a portata di click.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Il primo motore di ricerca italiano dedicato alle case prefabbricate, tiny house e uffici da giardino venduti su Amazon.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/finder">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-4 h-auto">
                Trova la tua Casa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600">
            <Home size={24} />
          </div>
          <h3 className="font-bold text-xl">Catalogo Intelligente</h3>
          <p className="text-slate-600">Filtra per metri quadri, prezzo, materiali e numero di vani. Trova esattamente ciò che cerchi.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-xl">Recensioni AI</h3>
          <p className="text-slate-600">Analizziamo le specifiche tecniche per fornirti Pro e Contro onesti su ogni modello.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border space-y-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
            <Truck size={24} />
          </div>
          <h3 className="font-bold text-xl">Garanzia Amazon</h3>
          <p className="text-slate-600">Acquista con la sicurezza della piattaforma più grande al mondo. Spedizioni e resi protetti.</p>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="bg-slate-100 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto a scoprire il futuro dell&apos;abitare?</h2>
        <Link href="/finder">
          <Button variant="outline" className="border-slate-900 text-slate-900 hover:bg-slate-200 text-lg px-8 py-3 h-auto">
            Vedi tutte le case <ArrowRight className="ml-2 w-5 h-5 inline" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
