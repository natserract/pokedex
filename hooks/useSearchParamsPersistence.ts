import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export default function useSearchParamsPersistence() {
  const searchParams = useSearchParams();

  const getWithUpdateSearchParams = useCallback(
    (values: { key: string; value: string }[]) => {
      const newSearchParams = new URLSearchParams();

      // Keep the previous query
      for (const [_key, _param] of searchParams.entries()) {
        newSearchParams.set(_key, _param);
      }

      // Add new value
      for (const { key, value } of values) {
        newSearchParams.set(key, value);
      }

      return newSearchParams;
    },
    [searchParams],
  );

  return {
    newUpdatedSearchParams: searchParams,
    getWithUpdateSearchParams,
  };
}
