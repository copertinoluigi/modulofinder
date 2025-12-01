import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">
          Modulo<span className="text-yellow-500">Finder</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/finder" className="text-sm font-medium hover:text-yellow-600">Trova Casa</Link>
          <Link href="/blog" className="text-sm font-medium hover:text-yellow-600">Blog & Guide</Link>
          <Link href="/finder">
            <Button variant="primary" className="text-xs bg-yellow-400 text-black hover:bg-yellow-500 border-none">
              Inizia Ricerca
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
