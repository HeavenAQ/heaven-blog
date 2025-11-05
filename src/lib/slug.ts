export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function deslugify(input: string): string {
  return input
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

