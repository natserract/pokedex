"use client";
import { useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "~/utils/cn";
import * as Dropdown from "~/components/base/dropdown";
import { SortType } from "~/components/pokemons/pokemons-utils";
import { SearchParamsKeys } from "~/constants/searchParamsKeys";
import useSearchParamsPersistence from "~/hooks/useSearchParamsPersistence";

export function SortAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getWithUpdateSearchParams } = useSearchParamsPersistence();

  const sortType = useMemo(
    () => searchParams?.get(SearchParamsKeys.SORT_BY_NAME) as SortType,
    [searchParams],
  );

  const handleSortByName = () => {
    const newSortType = sortType === "desc" ? "asc" : "desc";
    const newUpdatedSearchParams = getWithUpdateSearchParams([
      {
        key: SearchParamsKeys.SORT_BY_NAME,
        value: newSortType,
      },
    ]);

    const link = `/?${newUpdatedSearchParams.toString()}`;
    router.push(link);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="Urutkan pokemon"
          className={cn(
            "text-foreground/50 hover:text-foreground transition-all duration-200",
          )}
        >
          <ArrowUpDown size={20} className="shrink-0 " />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleSortByName()}
        >
          Urut nama {sortType && <i className="text-[9px]">({sortType})</i>}
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
