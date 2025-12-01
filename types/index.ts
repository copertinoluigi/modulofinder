export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  image_url: string;
  amazon_link: string;
  rooms: number | null;
  sqm: number | null;
  material: string | null;
  structure_type: string | null; // 'Tiny House', 'Prefabbricato', etc.
  is_prime: boolean;
  description: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML
  meta_description: string;
  is_published: boolean;
  created_at: string;
};
