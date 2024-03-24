"use client";
import NProgress from "nprogress";
import { useRouter } from "next/navigation";

import Button from "~/components/base/button";
import useSearchParamsPersistence from "~/hooks/useSearchParamsPersistence";
import { SearchParamsKeys } from "~/constants/searchParamsKeys";

type Props = {
  type: "prev" | "next";
  offset: number;
  limit: number;
};

export function PaginationButton({ offset, limit, type }: Props) {
  const router = useRouter();
  const { getWithUpdateSearchParams } = useSearchParamsPersistence();

  const handleClick = () => {
    const newUpdatedSearchParams = getWithUpdateSearchParams([
      {
        key: SearchParamsKeys.OFFSET,
        value: String(offset),
      },
      {
        key: SearchParamsKeys.LIMIT,
        value: String(limit),
      },
    ]);

    let link = `/?${newUpdatedSearchParams?.toString()}`;

    // If when advancing at the first offset and performing previous actions
    if (type === "prev" && offset < limit) {
      // Keep 'sortByName' param
      if (newUpdatedSearchParams.has(SearchParamsKeys.SORT_BY_NAME)) {
        link = `/?sortByName${newUpdatedSearchParams.get(SearchParamsKeys.SORT_BY_NAME)}`;
      } else {
        link = "/";
      }
    }

    NProgress.inc();
    router.push(link);
  };

  return (
    <Button
      variant="secondary"
      className="min-w-[100px] text-xs"
      onClick={handleClick}
    >
      {type == "next" ? "Next" : "Previous"}
    </Button>
  );
}
