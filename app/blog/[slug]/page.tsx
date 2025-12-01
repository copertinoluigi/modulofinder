import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Genera metadati dinamici per SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await supabase.from('posts').select('*').eq('slug', params.slug).single()
  if (!post) return { title: 'Articolo non trovato' }
  return {
    title: `${post.title} | ModuloFinder`,
    description: post.meta_description
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase.from('posts').select('*').eq('slug', params.slug).single()

  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-6 text-slate-900">{post.title}</h1>
      <div className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
