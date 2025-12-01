import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proteggi solo la route /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Cerchiamo un cookie semplice 'admin_auth'
    const authCookie = request.cookies.get('admin_auth')
    
    // Se non c'è il cookie e non stiamo cercando di fare login (gestito lato client per semplicità in questa fase),
    // In una app reale useresti Supabase Auth Middleware.
    // Per ora lasciamo aperto ma nota: dovrai proteggere l'API route.
    
    // NOTA: Per semplicità del tutorial, NON blocchiamo la pagina admin UI, 
    // ma proteggeremo l'API di scrittura.
    return NextResponse.next()
  }
}
