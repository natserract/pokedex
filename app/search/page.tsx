import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Loading } from "~/components/base/loading";
import { Pokemons } from "~/components/pokemons/pokemons-page";

export default function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const isSearch = !!searchParams.query;

  async function create(formData: FormData) {
    "use server";

    const rawFormData = {
      query: formData.get("query"),
    };

    redirect(
      `/search?query=${encodeURIComponent(rawFormData.query as string)}`,
    );
  }

  return (
    <section>
      <form action={create}>
        <input type="search" className="text-black" name="query" />
        <button type="submit">Cari</button>
      </form>

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
