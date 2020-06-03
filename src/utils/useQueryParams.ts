import { useMemo } from 'react';
import { useLocation } from 'react-use';

export function parseQueryParams<Type>(search = ''): Type {
  const entries = search
    .replace('?', '')
    .split('&')
    .map((it) => it.split('='));

  return entries.reduce((acc, entry) => ({ ...acc, [entry[0]]: entry[1] }), {} as Type);
}

export function useQueryParams<Type>(): Type {
  const search = useLocation().search;

  return useMemo(() => {
    return parseQueryParams(search);
  }, [search]);
}
