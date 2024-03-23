import Link from "next/link";
import { Search } from "lucide-react";

import { cn } from "~/utils/cn";

export function SearchAction() {
  return (
    <div>
      <Link
        href="/search"
        aria-label="Cari pokemon"
        aria-controls="search-pokemon-input"
        className={cn(
          "text-foreground/50 hover:text-foreground transition-all duration-200",
        )}
      >
        <Search
          size={20}
          className="shrink-0 transition-transform duration-200"
        />
      </Link>
    </div>
  );
}
