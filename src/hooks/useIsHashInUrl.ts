import { useLocation } from "react-use";

export function useIsHashInUrl(hashId: string): boolean {
  return !!useLocation().hash?.includes(hashId);
}
