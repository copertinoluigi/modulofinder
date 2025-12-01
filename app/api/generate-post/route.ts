import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { model } from '@/lib/gemini'

// Client Supabase con privilegi ADMIN (Service Role Key)
// Questa chiave NON deve mai essere esposta nel browser
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    // Verifica password semplice passata nell'header per sicurezza minima
    const password = req.headers.get('x-admin-password')
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productTitle, features, amazonLink } = await req.json()

    // Prompt per Gemini
    const prompt = `
      Sei un esperto copywriter SEO per "ModuloFinder". 
      Scrivi una recensione dettagliata in HTML (senza tag body/html) per il prodotto: ${productTitle}.
      Caratteristiche: ${features}.
      
      Struttura:
      <h2>Panoramica</h2>
      <p>Intro accattivante...</p>
      <h2>Caratteristiche Tecniche</h2>
      <ul>...</ul>
      <h2>Pro e Contro</h2>
      <p>Analisi onesta...</p>
      <h2>Conclusione</h2>
      <p>Giudizio finale.</p>
      
      Importante: Inserisci una Call to Action per vedere il prezzo su Amazon.
    `

    const result = await model.generateContent(prompt)
    const content = result.response.text()
    
    // Genera slug
    const slug = productTitle.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    // Salva nel DB
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title: `Recensione: ${productTitle}`,
        slug: slug,
        content: content,
        meta_description: `Scopri tutto su ${productTitle}. Prezzi, caratteristiche e opinioni.`,
        is_published: true
      })
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, slug })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 })
  }
}
