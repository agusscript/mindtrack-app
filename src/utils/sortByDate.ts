/**
 * Ordena un array de elementos por fecha de creación descendente (más recientes primero).
 * Si no hay fecha de creación, ordena por ID descendente.
 * 
 * @param items - Array de elementos con propiedades opcionales `createdAt` e `id`
 * @returns Array ordenado con los elementos más recientes primero
 */
export function sortByDateDesc<T extends { id: number; createdAt?: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    }
    
    if (a.createdAt && !b.createdAt) return -1;
    if (!a.createdAt && b.createdAt) return 1;
    
    return b.id - a.id;
  });
}

