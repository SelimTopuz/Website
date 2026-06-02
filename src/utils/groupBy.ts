export function groupBy<T>(
  items: readonly T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);
    const bucket = groups[key] ?? [];
    bucket.push(item);
    groups[key] = bucket;
    return groups;
  }, {});
}
