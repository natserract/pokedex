import dynamic from "next/dynamic";
import Image from "next/image";

import {
  GetPokemonParams,
  getPokemon,
} from "~/components/pokemons/pokemons-utils";
import type { PokemonDataGet } from "~/components/pokemons/shared/types";
import { PokemonsTypes } from "~/components/pokemons/shared/pokemons-types";
import { PokemonsAbility } from "~/components/pokemons/shared/pokemons-ability";

import { toCamelCase } from "~/utils/string";

type PokemonsDetailProps = GetPokemonParams;

export async function PokemonsDetail({ name }: PokemonsDetailProps) {
  const data = await getPokemon({ name });

  return <PokemonsDetailSection data={data} />;
}

type PokemonsDetailSectionProps = {
  data: PokemonDataGet;
};

const PokemonStats = dynamic(() => import("./shared/pokemons-stats"), {
  ssr: false,
});

function PokemonsDetailSection({ data }: PokemonsDetailSectionProps) {
  const { id, name, coverUrl, types, stats, description } = data;

  return (
    <section className="pokemons-detail pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <aside className="mb-5 flex flex-col items-center">
          <Image width={361} height={361} alt={name} src={coverUrl || ""} />
        </aside>
        <aside className="">
          <h1 className="text-3xl font-bold">{toCamelCase(name)}</h1>

          <div className="mt-4 inline-flex items-center gap-5">
            <span className="text-foreground/30 block">Types: </span>
            <PokemonsTypes types={types} />
          </div>

          <p className="my-5">{description}</p>
          <PokemonsAbility data={data} />
        </aside>
      </div>

      <div className="mt-10">
        <h3 className="mb-4">Stats: </h3>
        <PokemonStats data={stats} />
      </div>
    </section>
  );
}
