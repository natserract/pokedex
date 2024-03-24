import { search } from "~/components/search/actions";
import Button from "~/components/base/button";

export function FormSearch() {
  return (
    <form action={search} className="pb-10">
      <div className="flex flex-row gap-5">
        <input
          aria-label="Search keywords"
          type="search"
          className="border-muted text-foreground w-full border border-solid bg-transparent p-7 outline-none"
          placeholder="Enter keywords to search 'pokemon'"
          autoComplete="off"
          name="query"
        />
        <Button type="submit" variant="secondary" className="min-w-[100px]">
          Search
        </Button>
      </div>
    </form>
  );
}
