import { SearchAction } from "~/components/base/header/action-search";
import { SortAction } from "~/components/base/header/action-sort";

export function Action() {
  return (
    <div className="inline-flex gap-5">
      <SearchAction />
      <SortAction />
    </div>
  );
}
