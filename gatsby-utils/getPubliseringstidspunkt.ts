import { max } from 'date-fns';

export function getPubliseringsTidspunkt(page): string {
  const allUpdatedAt = getAllUpdatedAt(page);
  return max(allUpdatedAt.map((it) => new Date(it))).toISOString();
}

function getAllUpdatedAt(value) {
  if (Array.isArray(value)) {
    return value.flatMap((v) => getAllUpdatedAt(v));
  } else if (value && typeof value === 'object') {
    return Object.keys(value)
      .flatMap((key) => (key === '_updatedAt' ? value[key] : getAllUpdatedAt(value[key])))
      .filter((it) => it);
  }
}
