import { max } from "date-fns";
import getPropertyRecursivlyFromDeepObject from "../utils/getPropertyRecursivlyFromDeepObject";

// Innholdet kan bestå av delte tekster som kan være oppdatert på et senere tidspunkt enn hovdeddokumentet. Vi må derfor lete etter delte tekter (eller andre ting med et _updatedAt-felt), og finne det som var oppdatert senest.
// TODO: Fix typing
// @ts-ignore
export function getPubliseringsTidspunkt(page): string {
  const allUpdatedAt = getPropertyRecursivlyFromDeepObject<string>(page, "_updatedAt");
  return max(allUpdatedAt.map((it) => new Date(it))).toISOString();
}
