import { Suspense } from "react";

import { Loading } from "~/components/base/loading";
import { Pokemons } from "~/components/pokemons/pokemons-page";
import { FormSearch } from "~/components/search/form-search";

export default function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const isSearch = !!searchParams.query;

  return (
    <section className="">
      <FormSearch />

      {isSearch && (
        <Suspense fallback={<Loading />}>
          <Pokemons
            offset={0}
            limit={20}
            query={{
              name: searchParams.query as string,
            }}
          />
        </Suspense>
      )}
    </section>
  );
}
