import { Suspense } from "react";

import { Loading } from "~/components/base/loading";
import { PokemonsDetail } from "~/components/pokemons/pokemons-detail-page";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <PokemonsDetail name={params.slug} />
    </Suspense>
  );
}
