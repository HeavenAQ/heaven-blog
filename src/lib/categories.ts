import type { CollectionEntry } from 'astro:content';
import { deslugify } from './slug';

export function deriveCategoriesFromSlug(slug: string): string[] {
  const parts = slug.split('/').filter(Boolean);
  if (parts.length <= 1) return [];
  return parts.slice(0, -1).map((part) => deslugify(part));
}

export function getPostCategories(post: CollectionEntry<'blog'>): string[] {
  const derived = deriveCategoriesFromSlug(post.slug);
  if (derived.length > 0) return derived;
  return post.data.categories ?? [];
}
