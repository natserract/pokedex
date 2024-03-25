import { search } from "~/components/search/actions";
import { SubmitButton } from "~/components/search/form-submit-button";

export function FormSearch() {
  return (
    <form action={search} className="pb-10" data-testid="search-form">
      <div className="flex flex-row gap-5">
        <input
          aria-label="Search keywords"
          type="search"
          className="border-muted text-foreground w-full border border-solid bg-transparent p-7 outline-none"
          placeholder="Enter keywords to search 'pokemon'"
          autoComplete="off"
          data-testid="search-input"
          name="query"
        />
        <SubmitButton label="Search" loading="Searching..." />
      </div>
    </form>
  );
}
