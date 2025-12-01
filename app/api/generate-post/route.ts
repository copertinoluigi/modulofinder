import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { model } from '@/lib/gemini'

// Client Supabase Admin (per scrivere nel DB)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { productTitle, features, amazonLink } = await req.json()

    const prompt = `
      Agisci come un esperto di edilizia modulare. Scrivi una recensione web completa per: ${productTitle}.
      Caratteristiche tecniche: ${features}.
      
      Regole:
      1. Usa formato HTML pulito (<h2>, <p>, <ul>, <li>). Non usare Markdown, non usare <html> o <body>.
      2. Struttura: Introduzione, Analisi Tecnica, Pro e Contro, Conclusione.
      3. Tono: Professionale e utile per la SEO.
    `

    // Genera contenuto con Google Gemini
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    const slug = productTitle.toLowerCase().slice(0, 50).replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    // Salva nel DB
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert({
        title: `Recensione: ${productTitle}`,
        slug: slug,
        content: content,
        is_published: true 
      })
      .select()

    if (error) throw error

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Errore server' }, { status: 500 })
  }
}
