export function getDomElemnt(id: string) {
  return document.getElementById(id);
}

export function pxFromTop(id: string): number {
  return getDomElemnt(id)?.getBoundingClientRect().top || Number.POSITIVE_INFINITY;
}
