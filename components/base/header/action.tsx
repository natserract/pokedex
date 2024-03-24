import { Suspense } from "react";
import { Github } from "lucide-react";
import Link from "next/link";

import { Loading } from "~/components/base/loading";
import { SearchAction } from "~/components/base/header/action-search";
import { SortAction } from "~/components/base/header/action-sort";

import { cn } from "~/utils/cn";

export interface Props {
  disableSort?: boolean;
}

export function Action({ disableSort }: Props) {
  return (
    <div className="inline-flex gap-5">
      <SearchAction />

      <Suspense fallback={<Loading />}>
        <SortAction disabled={disableSort} />
      </Suspense>

      <Link
        href="https://github.com/natserract/pokedex/tree/main"
        target="_blank"
        className={cn(
          "text-foreground/50 hover:text-foreground transition-all duration-200",
        )}
      >
        <Github
          size={20}
          className="shrink-0 transition-transform duration-200"
        />
      </Link>
    </div>
  );
}
