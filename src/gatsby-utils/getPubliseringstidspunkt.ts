import { max } from "date-fns";
import getPropertyRecursivlyFromDeepObject from "../utils/getPropertyRecursivlyFromDeepObject";

export function getPubliseringsTidspunkt(page): string {
  const allUpdatedAt = getPropertyRecursivlyFromDeepObject<string>(page, "_updatedAt");
  return max(allUpdatedAt.map((it) => new Date(it))).toISOString();
}
