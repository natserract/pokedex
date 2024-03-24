import { SearchAction } from "~/components/base/header/action-search";
import { SortAction } from "~/components/base/header/action-sort";

export interface Props {
  disableSort?: boolean;
}

export function Action({ disableSort }: Props) {
  return (
    <div className="inline-flex gap-5">
      <SearchAction />
      <SortAction disabled={disableSort} />
    </div>
  );
}
