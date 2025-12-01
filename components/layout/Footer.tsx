import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white font-bold text-lg mb-4">ModuloFinder</h3>
          <p className="text-sm max-w-sm">
            La guida definitiva e comparatore intelligente per case modulari, prefabbricate e tiny house vendute su Amazon.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Link Utili</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/finder" className="hover:text-white">Comparatore</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legale</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Termini e Condizioni</Link></li>
            <li><Link href="/disclosure" className="hover:text-white">Affiliate Disclosure</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-xs text-center">
        <p>© {new Date().getFullYear()} ModuloFinder. Partecipiamo al Programma Affiliazione Amazon EU.</p>
      </div>
    </footer>
  )
}
