// utils/slug.ts

/**
 * Extracts numeric ID from a slug like "product-name-123"
 * @param slug the slug string
 * @returns number ID or null if invalid
 */
export function extractIdFromSlug(slug?: string): number | null {
  if (!slug || typeof slug !== 'string') return null;

  const parts = slug.split('-');
  const last = parts[parts.length - 1];
  const id = parseInt(last, 10);

  return isNaN(id) ? null : id;
}

/**
 * Extracts the name from slug like "product-name-123" => "product-name"
 * @param slug the slug string
 * @returns name without ID suffix
 */
export function extractNameFromSlug(slug?: string): string {
  if (!slug || typeof slug !== 'string') return '';

  const parts = slug.split('-');
  parts.pop(); // remove the ID
  return parts.join('-');
}
