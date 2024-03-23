import { Suspense } from "react";

import { Layout } from "~/components/base/layout";
import { Loading } from "~/components/base/loading";
import { Pokemons } from "~/components/pages/home";

export default async function Page({
  searchParams,
}: {
  searchParams: { name?: string; page?: string };
}) {
  const { name } = searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Pokemons />
      </Suspense>
    </Layout>
  );
}
