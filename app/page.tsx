import { Suspense } from "react";

import { Layout } from "~/components/base/layout";
import { Loading } from "~/components/base/loading";
import { Pokemons } from "~/components/pokemons/pokemons-page";

export default async function Page({
  searchParams,
}: {
  searchParams: { offset: string; limit: string };
}) {
  const offset = searchParams?.offset ? parseInt(searchParams.offset, 10) : 0;
  const limit = searchParams?.limit ? parseInt(searchParams.limit, 10) : 20;

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Pokemons offset={offset} limit={limit} />
      </Suspense>
    </Layout>
  );
}
