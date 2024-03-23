import { Suspense } from "react";

import { Layout } from "~/components/base/layout";
import { Loading } from "~/components/base/loading";
import { Pokemons } from "~/components/pages/home";

export default async function Page() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Pokemons />
      </Suspense>
    </Layout>
  );
}
